import { LoginPayload } from './payloads/login.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async createToken(user: any) {
    const payload = {
      expiresIn: '7d',
      // this.configService.get<string>('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      ...user,
    };

    return payload;
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.findOne(payload.username);

    if (!user || user.password != payload.password) {
      throw new UnauthorizedException('Username or Password is not correct!');
    }
    // const { password, ...result } = user;

    // return result;
    return user;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
