import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { UserDTO } from './types';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_user' }, id);
  }

  @Post()
  createNewUser(@Body() user: UserDTO) {
    return this.client.emit({ cmd: 'new_user' }, user);
  }
}
