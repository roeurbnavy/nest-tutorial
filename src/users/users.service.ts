import { UserEntity } from './entity/user.entity';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUIDType } from '@/common/validator/FindOneUUID.validator';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw 'User not found!';
    }
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ username: username });
    return user;
  }
}
