import { FilterQuery, PopulateOptions } from 'mongoose'
import { Orders } from 'src/models/orders.schema'
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository'
import { FindAllResponse } from 'src/types/common.type'

export interface OrdersRepositoryInterface
  extends BaseRepositoryAbstract<Orders> {
  findAllWithSubFields(
    condition: FilterQuery<Orders>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<Orders>>
}
