import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AppService } from './app.service';
import {
  Order,
  OrdersRequest,
  OrdersResponse,
  AddOrderRequest,
} from './order.pb';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getVersion() {
    return '0.0.1';
  }

  @GrpcMethod('OrderService', 'addOrder')
  addOrder(order: AddOrderRequest): Order {
    const result = this.appService.newOrder(order);

    if (!result) {
      throw new Error('Order already exists');
    } else {
      return result;
    }
  }

  @GrpcMethod('OrderService', 'getOrderById')
  @Get(':id')
  getOrder(orderId: number): Order {
    return this.appService.getOrderByID({ id: orderId });
  }

  @GrpcMethod('OrderService', 'getOrders')
  getOrders(params: OrdersRequest): OrdersResponse {
    return this.appService.getAllOrders(params);
  }
}
