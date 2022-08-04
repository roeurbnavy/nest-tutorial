import { UserEntity } from './entity/user.entity';
import { UserUpdateDTO } from './dto/update.dto';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from '@/common/decorator/roles.decorator';
import { AppRoles } from '@/common/enum/role.enum';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Public()
  @Query(() => [UserEntity])
  async getAll() {
    return await this.userService.getAll();
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: string): Promise<any> {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Mutation(() => UserEntity)
  @Roles(AppRoles.ADMINS)
  async update(
    @Args('id') id: string,
    @Args('updateInput') updateInput: UserUpdateDTO,
  ) {
    return await this.userService.update(id, updateInput);
  }

  @Mutation(() => String)
  @Roles(AppRoles.ADMINS)
  async deleted(@Args('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
