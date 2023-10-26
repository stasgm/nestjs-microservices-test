import {
  Controller,
  Inject,
  OnModuleInit,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  ORDER_SERVICE_NAME,
  OrdersResponse,
  Order,
  OrderServiceClient,
  AddOrderRequest,
} from '../../../orders/src/order.pb';

@Controller('orders')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  async addOrder(@Body() order: AddOrderRequest): Promise<Observable<Order>> {
    return this.svc.addOrder(order);
  }

  @Get()
  async getOrders(): Promise<Observable<OrdersResponse>> {
    return this.svc.getOrders(null);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Observable<Order>> {
    console.log(id);
    return this.svc.getOrderById({ id });
  }
}
