import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersController } from './users.controller';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [ConfigModule.forRoot(), OrderModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: 'USERS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USERS_SERVICE_HOST'),
            port: configService.get('USERS_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class AppModule {}
