import { FilterQuery, PopulateOptions } from 'mongoose'
import { Items } from 'src/models/item.schema'
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository'
import { FindAllResponse } from 'src/types/common.type'

interface AggregatedItem {
  name: string
  sku: string
  quantity: number
}

export interface GroupedItemsBySKU {
  _id: string // SKU
  totalQuantity: number // Sum of quantity for this SKU
  items: AggregatedItem[] // Array of items with this SKU
}

export interface ItemsRepositoryInterface
  extends BaseRepositoryAbstract<Items> {
  groupItemsBySKU(): Promise<GroupedItemsBySKU[]>

  lowQuantityItems(): Promise<GroupedItemsBySKU[]>

  findAllWithSubFields(
    condition: FilterQuery<Items>,
    projection?: string,
    populate?: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<FindAllResponse<Items>>
}
