import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { LocationsService } from './locations.service'
import { FindAllResponse } from 'src/types/common.type'
import { Locations } from 'src/models/location.schema'
import { CreateLocationDTO } from './dto/create-location.dto'
import { UpdateLocationDTO } from './dto/update-location.dto'

@Controller('api/locations')
@ApiTags('LOCATIONS')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({
    summary: 'Get all locations',
    description: 'Get all locations.',
  })
  @Get()
  async getAllLocations(): Promise<FindAllResponse<Locations>> {
    const res = await this.locationsService.findAll()
    return res
  }

  @ApiOperation({
    summary: 'Get location details by id',
    description: 'Get location details by id.',
  })
  @ApiQuery({ name: 'id', description: 'Location id' })
  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Locations> {
    return await this.locationsService.findOne(id)
  }

  @ApiOperation({
    summary: 'Create location',
    description: 'Create location.',
  })
  @ApiBody({ type: CreateLocationDTO })
  @Post()
  async createLocation(
    @Body() createLocationDTO: CreateLocationDTO,
  ): Promise<Locations> {
    return await this.locationsService.create(createLocationDTO)
  }

  @ApiOperation({
    summary: 'Update location',
    description: 'Update location by id.',
  })
  @ApiQuery({ name: 'id', description: 'Location id' })
  @ApiBody({ type: UpdateLocationDTO })
  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDTO: CreateLocationDTO,
  ): Promise<Locations> {
    return await this.locationsService.update(id, updateLocationDTO)
  }

  @ApiOperation({
    summary: 'Delete location',
    description: 'Delete location by id.',
  })
  @ApiQuery({ name: 'id', description: 'Location id' })
  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<boolean> {
    return await this.locationsService.remove(id)
  }
}
