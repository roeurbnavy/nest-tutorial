import { UpdatePayload } from './payloads/update.payload';
import { UUIDType } from './../common/validator/FindOneUUID.validator';
// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful ' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Param('id') id: string): Promise<any> {
    return await this.userService.findUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdatePayload) {
    console.log(id, payload);
    return await this.userService.update(id, payload);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Profile Request Failed' })
  async deleted(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
