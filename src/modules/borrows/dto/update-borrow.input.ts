import { CreateBorrowInput } from './create-borrow.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBorrowInput extends PartialType(CreateBorrowInput) {
  @Field(() => String)
  id: string;
}
