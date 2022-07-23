import { UsersService } from './../users/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'admin',
    });
  }

  async validate({ iat, exp, id }, done) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    done(null, user);
  }
}
