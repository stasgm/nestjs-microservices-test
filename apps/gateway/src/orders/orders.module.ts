import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { resolve } from 'path';

import {
  ORDER_SERVICE_NAME,
  ORDER_PACKAGE_NAME,
} from '../../../orders/src/order.pb';
import { ConfigModule, ConfigService } from '@nestjs/config';

const protoPath = resolve(__dirname, '../../grpc-nest-proto/proto/order.proto');

// console.log(protoPath);

@Module({
  controllers: [OrderController],
  imports: [ConfigModule.forRoot()],
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: ORDER_SERVICE_NAME,
  //       transport: Transport.GRPC,
  //       options: {
  //         url: '0.0.0.0:50051',
  //         package: ORDER_PACKAGE_NAME,
  //         protoPath,
  //       },
  //     },
  //   ]),
  // ],
  providers: [
    {
      provide: ORDER_SERVICE_NAME,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('ORDERS_SERVICE_HOST');
        const port = configService.get('ORDERS_SERVICE_PORT');

        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: `${host}:${port}`,
            package: ORDER_PACKAGE_NAME,
            protoPath,
          },
        });
      },
    },
  ],
})
export class OrdersModule {}
