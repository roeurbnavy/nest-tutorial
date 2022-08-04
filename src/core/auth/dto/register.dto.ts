import { AppRoles } from '@/common/enum/role.enum';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
// import { UserEntity } from '../../user';
import { SameAs } from '../../../common/validator/same-as.validator';
// import { Unique } from '../../common/validator/unique.validator';

@InputType()
export class RegisterDTO {
  @Field()
  @IsAlphanumeric()
  @IsNotEmpty()
  // @Unique([UserEntity])
  username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  // @Unique([UserEntity])
  email: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  roles?: AppRoles[];

  @Field()
  @Matches(/^[a-zA-Z ]+$/)
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @Field()
  @SameAs('password')
  passwordConfirmation: string;
}
