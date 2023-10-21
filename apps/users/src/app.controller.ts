import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { UserDTO } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getVersion() {
    return '0.0.1';
  }

  @MessagePattern({ cmd: 'new_user' })
  newUser(user: UserDTO): string {
    const result = this.appService.newUser(user);

    if (!result) {
      return 'User already exists';
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_user' })
  getBook(userId: string): UserDTO {
    return this.appService.getUserByID(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  getBooks(): UserDTO[] {
    return this.appService.getAllUsers();
  }
}
