import { Inject, Injectable } from '@nestjs/common'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { ItemsRepositoryInterface } from './interfaces/item.interface'
import { Items } from 'src/models/item.schema'
import { FilterQuery } from 'mongoose'
import { CreateItemDTO } from './dto/create-item.dto'
import { LocationsService } from '../locations/locations.service'
import { GroupedItemsBySKU } from './interfaces/item.interface'

@Injectable()
export class ItemsService extends BaseServiceAbstract<Items> {
  constructor(
    @Inject('ItemsRepositoryInterface')
    private readonly items_repository: ItemsRepositoryInterface,
    private readonly locations_service: LocationsService,
  ) {
    super(items_repository)
  }

  async filterItems(name: string, sku: string) {
    const condition: FilterQuery<Items> = {}

    if (sku) condition['sku'] = { $regex: sku, $options: 'i' }
    if (name) condition['name'] = { $regex: name, $options: 'i' }

    return await this.items_repository.findAll(condition)
  }

  async addItems(createItemDTO: CreateItemDTO) {
    // check if location is valid

    const locationId = createItemDTO.location

    const location = await this.locations_service.findOne(locationId)

    if (!location) {
      throw new Error('Location not found')
    }

    return await this.items_repository.create(createItemDTO)
  }

  async getAllItemsWithSubFields() {
    return await this.items_repository.findAllWithSubFields({}, null, [
      'locationInfo',
    ])
  }

  async statistics(): Promise<GroupedItemsBySKU[]> {
    // Group all items by sku and count
    const items = await this.items_repository.lowQuantityItems()
    return items
  }
}
