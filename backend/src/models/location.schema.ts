import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseEntity } from 'src/common/base.entity'

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Locations extends BaseEntity {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  district: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  country: string
}

export const LocationsSchema = SchemaFactory.createForClass(Locations)
