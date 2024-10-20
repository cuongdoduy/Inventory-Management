import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import ormconfig from './database/ormconfig'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsModule } from './modules/items/items.module'
import { OrdersModule } from './modules/orders/orders.module'
import { LocationsModule } from './modules/locations/locations.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(ormconfig, {
      dbName: process.env.MONGO_DATABASE,
    }),
    ItemsModule,
    OrdersModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
