import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Orders, OrdersSchema } from 'src/models/orders.schema'
import { OrdersRepository } from 'src/repositories/orders.repository'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ItemsModule } from '../items/items.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    ItemsModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'OrdersRepositoryInterface',
      useClass: OrdersRepository,
    },
  ],
  exports: [],
})
export class OrdersModule {}
