/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

/** getOrders */
export interface OrdersRequest {
}

export interface OrdersResponse {
  orders: Order[];
}

export interface AddOrderRequest {
  number: string;
  pickupDate: string;
  description: string;
}

export interface Order {
  id: number;
  number: string;
  pickupDate: string;
  description: string;
}

export interface OrderByIdRequest {
  id: number;
}

export interface OrderByIdResponse {
  order: Order | undefined;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  getOrders(request: OrdersRequest): Observable<OrdersResponse>;

  getOrderById(request: OrderByIdRequest): Observable<Order>;

  addOrder(request: AddOrderRequest): Observable<Order>;
}

export interface OrderServiceController {
  getOrders(request: OrdersRequest): Promise<OrdersResponse> | Observable<OrdersResponse> | OrdersResponse;

  getOrderById(request: OrderByIdRequest): Promise<Order> | Observable<Order> | Order;

  addOrder(request: AddOrderRequest): Promise<Order> | Observable<Order> | Order;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrders", "getOrderById", "addOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
