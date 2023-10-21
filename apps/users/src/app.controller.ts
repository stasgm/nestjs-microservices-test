import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { delay } from 'rxjs';
import { UserDTO } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'new_user' })
  newUser(user: UserDTO): string {
    delay(10000);
    const result = this.appService.newUser(user);
    if (!result) {
      return 'Book already exists';
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
