import { UserEntity } from './../users/entity/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => Int)
  expiresIn: number;

  @Field()
  accessToken: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
