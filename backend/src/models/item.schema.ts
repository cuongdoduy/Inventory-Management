import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseEntity } from 'src/common/base.entity'

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Items extends BaseEntity {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  sku: string

  @Prop({ required: true, default: 0 })
  quantity: number

  @Prop({ required: true, type: String, ref: 'Locations' })
  location: string
}

export const ItemSchema = SchemaFactory.createForClass(Items)
