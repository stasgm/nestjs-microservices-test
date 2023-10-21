import { Injectable } from '@nestjs/common';

import { UserDTO } from './types';

const users: UserDTO[] = [];

@Injectable()
export class AppService {
  getUserByID(userID: string) {
    return users.find((b: UserDTO) => b.id == userID);
  }

  getAllUsers() {
    return users;
  }

  newUser(user: UserDTO) {
    const exists = users.find((usr: UserDTO) => {
      return usr.name == user.name;
    });

    if (exists) {
      return false;
    }

    user.id = 'User_' + (users.length + 1);
    users.push(user);

    return user.id;
  }
}
