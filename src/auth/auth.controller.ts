import { RegisterPayload } from './payloads/register.payload';
import { LoginPayload } from './payloads/login.payload';
import { UsersService } from './../users/users.service';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, SetMetadata } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { ChangePasswordPayload } from './payloads/changePassword.payload';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    return this.usersService.create(payload);
  }

  @Public()
  @Post('changePassword')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Body() payload: ChangePasswordPayload): Promise<any> {
    const user = this.usersService.changePassword(payload);

    return user;
  }
}
