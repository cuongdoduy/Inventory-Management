import { Items } from 'src/models/item.schema'
import { ItemsRepositoryInterface } from 'src/modules/items/interfaces/item.interface'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, PopulateOptions } from 'mongoose'
import { BaseRepositoryAbstract } from './base/base.abstract.repository'
import { FindAllResponse } from 'src/types/common.type'

@Injectable()
export class ItemsRepository
  extends BaseRepositoryAbstract<Items>
  implements ItemsRepositoryInterface
{
  constructor(
    @InjectModel(Items.name)
    private readonly Item_Repository: Model<Items>,
  ) {
    super(Item_Repository)
  }

  async groupItemsBySKU() {
    return this.Item_Repository.aggregate([
      {
        $group: {
          _id: '$sku',
          totalQuantity: { $sum: '$quantity' },
          items: {
            $push: {
              name: '$name',
              sku: '$sku',
              quantity: '$quantity',
            },
          },
        },
      },
    ])
  }

  // Get Item that low quantity, group by location and sku
  async lowQuantityItems() {
    return this.Item_Repository.aggregate([
      {
        $match: {
          quantity: { $lt: 10 },
        },
      },
      {
        $group: {
          _id: {
            sku: '$sku',
          },
          totalQuantity: { $sum: '$quantity' },
          items: {
            $push: {
              name: '$name',
              sku: '$sku',
              quantity: '$quantity',
            },
          },
        },
      },
    ])
  }

  async findAllWithSubFields(
    condition: FilterQuery<Items>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<Items>> {
    const [count, items] = await Promise.all([
      this.Item_Repository.countDocuments({ ...condition, deleted_at: null }),
      this.Item_Repository.find(
        { ...condition, deleted_at: null },
        projection,
      ).populate(populate),
    ])
    return {
      count,
      items,
    }
  }
}
