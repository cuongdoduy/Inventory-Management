import { Orders } from 'src/models/orders.schema'
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository'

export class OrdersRepositoryInterface extends BaseRepositoryAbstract<Orders> {}
