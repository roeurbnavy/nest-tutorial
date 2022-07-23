import { LoginPayload } from './payloads/login.payload';
import { UsersService } from './../users/users.service';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, SetMetadata } from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';

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

  @ApiBasicAuth()
  @Post('register')
  async register(
    @Body() payload: { username: string; password: string },
  ): Promise<any> {
    return payload;
  }
}
