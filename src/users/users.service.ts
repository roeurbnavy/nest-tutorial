import { UserEntity } from './entity/user.entity';
import {
  Body,
  Injectable,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUIDType } from '@/common/validator/FindOneUUID.validator';
import { RegisterPayload } from '@/auth/payloads/register.payload';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw 'User not found!';
    }
    // const { password, ...result } = user;
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ username: username });
    return user;
  }

  async create(payload: RegisterPayload) {
    const user = await this.findOne(payload.username);
    if (user) {
      throw new NotAcceptableException(
        'Admin with provided username already created.',
      );
    }

    return this.userRepository.save(this.userRepository.create(payload));
  }
}
