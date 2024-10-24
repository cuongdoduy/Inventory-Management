import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, PopulateOptions } from 'mongoose'
import { BaseRepositoryAbstract } from './base/base.abstract.repository'
import { OrdersRepositoryInterface } from 'src/modules/orders/interfaces/orders.interface'
import { Orders } from 'src/models/orders.schema'
import { FindAllResponse } from 'src/types/common.type'

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

  async findAllWithSubFields(
    condition: FilterQuery<Orders>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<Orders>> {
    const [count, items] = await Promise.all([
      this.Order_Repository.countDocuments({ ...condition, deleted_at: null }),
      this.Order_Repository.find(
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
