import { Inject, Injectable } from '@nestjs/common'
import { LocationsRepositoryInterface } from './interfaces/locations.interface'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { Locations } from 'src/models/location.schema'

@Injectable()
export class LocationsService extends BaseServiceAbstract<Locations> {
  constructor(
    @Inject('LocationsRepositoryInterface')
    private readonly locations_repository: LocationsRepositoryInterface,
  ) {
    super(locations_repository)
  }
}
