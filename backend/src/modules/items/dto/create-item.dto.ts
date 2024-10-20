import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateItemDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  sku: string

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  quantity: number

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  location: string
}
