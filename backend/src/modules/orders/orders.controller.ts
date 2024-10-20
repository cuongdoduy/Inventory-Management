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
import { OrdersService } from './orders.service'
import { FindAllResponse } from 'src/types/common.type'
import { Orders } from 'src/models/orders.schema'
import { CreateOrderDTO } from './dto/create-order.dto'
import { UpdateOrderDTO } from './dto/update-order.dto'

@ApiTags('ORDERS')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Get all orders',
    description: 'Get all orders.',
  })
  @Get()
  async getAllOrders(): Promise<FindAllResponse<Orders>> {
    const res = await this.ordersService.findAll()
    return res
  }

  @ApiOperation({
    summary: 'Get order details by id',
    description: 'Get order details by id.',
  })
  @ApiParam({ name: 'id', description: 'Order id' })
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Orders> {
    return await this.ordersService.findOne(id)
  }

  @ApiOperation({
    summary: 'Create order',
    description: 'Create order.',
  })
  @ApiBody({ type: CreateOrderDTO })
  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Orders> {
    return await this.ordersService.createOrder(createOrderDTO)
  }

  @ApiOperation({
    summary: 'Update order',
    description: 'Update order by id.',
  })
  @ApiParam({ name: 'id', description: 'Order id' })
  @ApiBody({ type: CreateOrderDTO })
  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<Orders> {
    return await this.ordersService.update(id, updateOrderDTO)
  }
}
