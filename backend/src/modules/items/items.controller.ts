import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ItemsService } from './items.service'
import { Items } from 'src/models/item.schema'
import { FindAllResponse } from 'src/types/common.type'
import { CreateItemDTO } from './dto/create-item.dto'
import { UpdateItemDTO } from './dto/update-item.dto'

@ApiTags('ITEMS')
@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({
    summary: 'Get item details',
    description: 'Get item details by page.',
  })
  @Get()
  async getAllItems(): Promise<FindAllResponse<Items>> {
    const res = await this.itemsService.findAll()
    return res
  }

  @ApiOperation({
    summary: 'Filter items',
    description: 'Filter items by name or sky.',
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sku', required: false })
  @Get('filter')
  async filterItems(
    @Query('name') name: string,
    @Query('sku') sku: string,
  ): Promise<FindAllResponse<Items>> {
    return await this.itemsService.filterItems(name, sku)
  }

  @ApiOperation({
    summary: 'Get item statistics',
    description: 'Get item statistics.',
  })
  @Get('statistics')
  async getStatistics(): Promise<any> {
    return await this.itemsService.statistics()
  }

  @ApiOperation({
    summary: 'Get item details by id',
    description: 'Get item details by id.',
  })
  @ApiParam({ name: 'id', description: 'Item id' })
  @Get(':id')
  async getItemById(@Param('id') id: string): Promise<Items> {
    return await this.itemsService.findOne(id)
  }

  @ApiOperation({
    summary: 'Create new item',
    description: 'Create new item.',
  })
  @ApiBody({
    type: CreateItemDTO,
    description: 'Create new item',
  })
  @Post()
  async createItem(@Body() createItem: CreateItemDTO): Promise<Items> {
    return await this.itemsService.addItems(createItem)
  }

  @ApiOperation({
    summary: 'Update item details',
    description: 'Update item details by id.',
  })
  @ApiParam({ name: 'id', description: 'Item id' })
  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body()
    updateItem: UpdateItemDTO,
  ): Promise<Items> {
    return await this.itemsService.update(id, updateItem)
  }

  @ApiOperation({
    summary: 'Delete item',
    description: 'Delete item by id.',
  })
  @ApiParam({ name: 'id', description: 'Item id' })
  @Delete(':id')
  async deleteItem(@Param('id') id: string): Promise<boolean> {
    return await this.itemsService.remove(id)
  }
}
