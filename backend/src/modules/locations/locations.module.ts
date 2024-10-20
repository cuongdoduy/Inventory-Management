import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Locations, LocationsSchema } from 'src/models/location.schema'
import { LocationsController } from './locations.controller'
import { LocationsService } from './locations.service'
import { LocationsRepository } from 'src/repositories/location.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Locations.name, schema: LocationsSchema },
    ]),
  ],
  controllers: [LocationsController],
  providers: [
    LocationsService,
    {
      provide: 'LocationsRepositoryInterface',
      useClass: LocationsRepository,
    },
  ],
  exports: [LocationsService],
})
export class LocationsModule {}
