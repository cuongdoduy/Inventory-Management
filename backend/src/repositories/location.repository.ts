import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepositoryAbstract } from './base/base.abstract.repository'
import { Locations } from 'src/models/location.schema'
import { LocationsRepositoryInterface } from 'src/modules/locations/interfaces/locations.interface'

@Injectable()
export class LocationsRepository
  extends BaseRepositoryAbstract<Locations>
  implements LocationsRepositoryInterface
{
  constructor(
    @InjectModel(Locations.name)
    private readonly Location_Repository: Model<Locations>,
  ) {
    super(Location_Repository)
  }
}
