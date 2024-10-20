import { Module } from '@nestjs/common'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'
import { Items, ItemSchema } from 'src/models/item.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsRepository } from 'src/repositories/item.repository'
import { LocationsModule } from '../locations/locations.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Items.name, schema: ItemSchema }]),
    LocationsModule,
  ],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: 'ItemsRepositoryInterface',
      useClass: ItemsRepository,
    },
  ],
  exports: [ItemsService],
})
export class ItemsModule {}
