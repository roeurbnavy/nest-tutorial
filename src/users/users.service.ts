import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'user',
      password: 'user',
    },
  ];

  async getAll() {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username == username);
  }

  async findUserById(id: number): Promise<User> {
    return this.users.find((it) => it.userId == id);
  }
}
