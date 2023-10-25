import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { resolve } from 'path';

import {
  ORDER_SERVICE_NAME,
  ORDER_PACKAGE_NAME,
} from '../../../orders/src/order.pb';

const protoPath = resolve(__dirname, '../../grpc-nest-proto/proto/order.proto');

// console.log(protoPath);

@Module({
  controllers: [OrderController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: ORDER_PACKAGE_NAME,
          protoPath,
        },
      },
    ]),
  ],
})
export class OrderModule {}
