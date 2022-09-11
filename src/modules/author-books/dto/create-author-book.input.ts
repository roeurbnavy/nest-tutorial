import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorBookInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;
}
