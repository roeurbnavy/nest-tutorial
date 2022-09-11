import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  pubYear?: Date;
}
