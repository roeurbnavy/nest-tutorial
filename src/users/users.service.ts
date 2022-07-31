import { UserUpdateDTO } from './dto/update.dto';
import { UserEntity } from './entity/user.entity';
import {
  BadRequestException,
  Body,
  Injectable,
  NotAcceptableException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUIDType } from '@/common/validator/FindOneUUID.validator';
import { RegisterDTO } from '@/auth/dto/register.dto';
import { Hash } from '@/util/Hash';
import { ChangePasswordDTO } from '@/auth/dto/changePassword.dto';

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

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ username: username });
    // if (!user) {
    //   throw new UnauthorizedException('User not found!');
    // }
    return user;
  }

  async create(payload: RegisterDTO) {
    const user = await this.userRepository.findOneBy({
      username: payload.username,
    });
    if (user) {
      throw new NotAcceptableException(
        'Admin with provided username already created.',
      );
    }

    return this.userRepository.save(this.userRepository.create(payload));
  }

  async changePassword(payload: ChangePasswordDTO): Promise<any> {
    const user = await this.findOneByUsername(payload.username);
    if (!user || !Hash.compare(payload.currentPassword, user.password)) {
      throw new UnauthorizedException('Invalid credential!');
    }

    await this.userRepository
      .createQueryBuilder('users')
      .update(UserEntity)
      .set({ password: payload.password })
      .where('username=:username', { username: payload.username })
      .execute();
    return user;
  }

  async update(id: string, payload: UserUpdateDTO): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: id });
    const update = { ...user, ...payload };
    delete update.password;
    // const {password,...doc} = update
    try {
      return await this.userRepository.save(update);
    } catch (error) {
      throw new NotAcceptableException('Username Or Email is exist');
    }
  }

  async delete(id: string) {
    const user = await this.findUserById(id);
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected == 1) {
      return { message: `Deleted ${user.username} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a profile by the name of ${user.username}.`,
      );
    }
  }
}
