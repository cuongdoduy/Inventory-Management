import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateLocationDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  address: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  district: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  city: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  country: string
}
