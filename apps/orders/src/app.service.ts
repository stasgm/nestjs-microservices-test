import { Injectable } from '@nestjs/common';

import {
  Order,
  OrderByIdRequest,
  OrdersRequest,
  OrdersResponse,
  AddOrderRequest,
} from './order.pb';

const orders: Order[] = [
  {
    id: 1,
    description: 'test order',
    number: 'ORD0001',
    pickupDate: '2023-12-22',
  },
  {
    id: 2,
    description: 'test order 2',
    number: 'ORD0002',
    pickupDate: '2023-12-24',
  },
  {
    id: 1,
    description: 'test order 3',
    number: 'ORD0003',
    pickupDate: '2023-12-26',
  },
];

@Injectable()
export class AppService {
  getOrderByID(params: OrderByIdRequest): Order {
    return orders.find((b: Order) => b.id == params.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllOrders(params: OrdersRequest): OrdersResponse {
    return {
      orders,
    };
  }

  newOrder(order: AddOrderRequest): Order {
    const exists = orders.find((ord: Order) => {
      return ord.number === order.number;
    });

    if (exists) {
      throw new Error('Order exists');
    }

    order.number = 'ORD_' + (orders.length + 1);
    const newOrder: Order = { id: orders.length + 1, ...order };

    orders.push(newOrder);

    return newOrder;
  }
}
