import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [OrdersModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
