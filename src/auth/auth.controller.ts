import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
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
import { ChangePasswordDTO } from './dto/changePassword.dto';

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
  async login(@Body() payload: LoginDTO): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterDTO): Promise<any> {
    return this.usersService.create(payload);
  }

  @Public()
  @Post('changePassword')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Body() payload: ChangePasswordDTO): Promise<any> {
    const user = this.usersService.changePassword(payload);

    return user;
  }
}
