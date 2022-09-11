import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReaderInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
