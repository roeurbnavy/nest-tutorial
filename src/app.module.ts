import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { AuthzModule } from './authz/authz.module';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // AuthzModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
