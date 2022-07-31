import { UserEntity } from './../users/entity/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

import { Public } from 'src/common/decorator/public.decorator';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './author.schema';
import { CurrentUser } from '@/common/decorator/currentUser.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Mutation(() => Author)
  async login(@Args('loginInput') loginInput: LoginDTO): Promise<any> {
    const user = await this.authService.validateUser(loginInput);
    return await this.authService.createToken(user);
  }

  @Public()
  @Mutation(() => UserEntity)
  async register(@Args('doc') doc: RegisterDTO): Promise<any> {
    console.log('doc', doc);
    // return 'done';
    return this.usersService.create(doc);
  }

  @Public()
  @Mutation(() => UserEntity)
  async changePassword(
    @Args('userInput') userInput: ChangePasswordDTO,
  ): Promise<UserEntity> {
    const user = this.usersService.changePassword(userInput);

    return user;
  }

  @Query(() => UserEntity)
  whoAmI(@CurrentUser() user: UserEntity) {
    return this.usersService.findUserById(user.id);
  }
}
