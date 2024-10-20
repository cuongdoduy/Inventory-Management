import { Inject, Injectable } from '@nestjs/common'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { OrdersRepositoryInterface } from './interfaces/orders.interface'
import { Orders } from 'src/models/orders.schema'
import { CreateOrderDTO } from './dto/create-order.dto'
import { ItemsService } from '../items/items.service'
import { FindAllResponse } from 'src/types/common.type'
import { Items } from 'src/models/item.schema'
import { FilterQuery } from 'mongoose'

@Injectable()
export class OrdersService extends BaseServiceAbstract<Orders> {
  constructor(
    @Inject('OrdersRepositoryInterface')
    private readonly orders_repository: OrdersRepositoryInterface,
    private readonly items_service: ItemsService,
  ) {
    super(orders_repository)
  }

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Orders> {
    const itemsId = createOrderDTO.items.map((item) => item.item)

    const request: FilterQuery<Items> = {}

    request['_id'] = { $in: itemsId }

    // Fetch only the necessary fields to reduce query payload
    const items: FindAllResponse<Items> = await this.items_service.findAll(
      request,
      'quantity',
    )

    if (items.count !== itemsId.length) {
      throw new Error('Some items were not found in the inventory')
    }

    // Create a Map for faster lookup of items in the order
    const itemsMap = new Map(
      items.items.map((item) => [item._id.toString(), item]),
    )

    // Validate quantities for all items in the order
    createOrderDTO.items.forEach((orderItem) => {
      const inventoryItem = itemsMap.get(orderItem.item)
      if (!inventoryItem || orderItem.quantity > inventoryItem.quantity) {
        throw new Error(`Insufficient quantity for item: ${orderItem.item}`)
      }
    })

    // Create the order
    const order = await this.orders_repository.create(createOrderDTO)

    // Prepare quantity updates in parallel
    const updatePromises = createOrderDTO.items.map((orderItem) => {
      const newQuantity =
        itemsMap.get(orderItem.item).quantity - orderItem.quantity
      return this.items_service.update(orderItem.item, {
        quantity: newQuantity,
      })
    })

    // Execute all updates concurrently for better performance
    await Promise.all(updatePromises)

    return order
  }
}
