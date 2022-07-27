import { UserUpdateDTO } from './dto/update.dto';
import { UUIDType } from './../common/validator/FindOneUUID.validator';
// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from '@/common/decorator/roles.decorator';
import { AppRoles } from '@/common/enum/role.enum';

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
    const user = await this.userService.findUserById(id);
    return user.toJson();
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(AppRoles.ADMINS)
  async update(@Param('id') id: string, @Body() payload: UserUpdateDTO) {
    return await this.userService.update(id, payload);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(AppRoles.ADMINS)
  @ApiResponse({ status: 200, description: 'Delete Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Profile Request Failed' })
  async deleted(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
