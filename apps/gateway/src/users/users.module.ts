import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [ConfigModule.forRoot()],
  providers: [
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
export class UsersModule {}
