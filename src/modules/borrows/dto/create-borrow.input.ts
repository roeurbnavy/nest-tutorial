import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BorrowInput {
  @Field(() => Date, { description: 'Borrow date' })
  tranDate: Date;

  @Field(() => Date, { description: 'Return date' })
  returnDate: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  readerId: string;
}

@InputType()
export class BorrowDetailInput {
  @Field()
  bookId: string;
}

@InputType()
export class CreateBorrowInput {
  @Field()
  doc: BorrowInput;

  @Field(() => [BorrowDetailInput])
  details: BorrowDetailInput[];
}
