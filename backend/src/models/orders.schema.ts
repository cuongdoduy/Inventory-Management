import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BaseEntity } from 'src/common/base.entity'

@Schema({ timestamps: true })
export class Orders extends BaseEntity {
  @Prop({
    type: [
      {
        item: { type: String, ref: 'Items' },
        quantity: { type: Number, default: 1 },
      },
    ],
  })
  items: { item: string; quantity: number }[]

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)
