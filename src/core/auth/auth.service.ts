import { UserEntity } from './../users/entity/user.entity';
import { Hash } from '@/util/Hash';
import { LoginDTO } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private config: ConfigService,
  ) {}

  async createToken(user: UserEntity) {
    const payload = {
      expiresIn: this.config.get<string>('JWT_EXPIRES'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };

    return payload;
  }

  async validateUser(payload: LoginDTO): Promise<UserEntity> {
    const user = await this.userService.findOneByUsername(payload.username);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Username or Password is not correct!');
    }

    return user;
  }
}
