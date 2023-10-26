import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'PRODUCTS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: configService.get('PRODUCTS_SERVICE_HOST'),
            port: configService.get('PRODUCTS_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class ProductsModule {}
