import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: {
          // expiresIn: config.get('JWT_EXPIRES')
          ...(config.get<string>('JWT_EXPIRES')
            ? {
                expiresIn: Number(config.get('JWT_EXPIRES')),
              }
            : {}),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
