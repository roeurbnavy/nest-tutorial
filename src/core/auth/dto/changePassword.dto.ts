import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ChangePasswordDTO {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  currentPassword: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
