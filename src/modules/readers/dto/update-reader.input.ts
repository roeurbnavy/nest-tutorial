import { CreateReaderInput } from './create-reader.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReaderInput extends PartialType(CreateReaderInput) {
  @Field(() => String)
  id: string;
}
