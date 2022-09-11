import { CreateAuthorBookInput } from './create-author-book.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorBookInput extends PartialType(CreateAuthorBookInput) {
  @Field()
  id: string;
}
