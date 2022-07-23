// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @ApiBasicAuth()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful ' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Param() id: number): Promise<any> {
    return id;
    // await this.userService.findUserById(id);
  }
}
