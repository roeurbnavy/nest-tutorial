import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
