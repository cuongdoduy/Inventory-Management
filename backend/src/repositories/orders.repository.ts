import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepositoryAbstract } from './base/base.abstract.repository'
import { OrdersRepositoryInterface } from 'src/modules/orders/interfaces/orders.interface'
import { Orders } from 'src/models/orders.schema'

@Injectable()
export class OrdersRepository
  extends BaseRepositoryAbstract<Orders>
  implements OrdersRepositoryInterface
{
  constructor(
    @InjectModel(Orders.name)
    private readonly Order_Repository: Model<Orders>,
  ) {
    super(Order_Repository)
  }
}
