import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator'
import { ObjectId } from 'mongoose'

class ItemDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  readonly item: string

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number
}

export class CreateOrderDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[]
}
