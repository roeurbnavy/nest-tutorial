import { RolesGuard } from './common/guard/roles.guard';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get<string>('DB_TYPE'),
          host: config.get<string>('DB_HOST'),
          port: config.get<string>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [__dirname + '**/**/*.entity.{ts,js}'],
          // [join(__dirname, '**', '*.entity.{ts,js}')] // Work,
          subscribers: [__dirname + '**/**/*.subscriber.{ts,js}'],
          synchronize: config.get<string>('DB_SYNC'),
          retryAttempts: 20,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
