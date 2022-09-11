import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReadersService } from './readers.service';
import { Reader } from './entities/reader.entity';
import { CreateReaderInput } from './dto/create-reader.input';
import { UpdateReaderInput } from './dto/update-reader.input';
import { Public } from '@/common/decorator/public.decorator';

@Resolver(() => Reader)
export class ReadersResolver {
  constructor(private readonly readersService: ReadersService) {}

  @Public()
  @Mutation(() => Reader)
  async createReader(
    @Args('createReaderInput') createReaderInput: CreateReaderInput,
  ) {
    return await this.readersService.create(createReaderInput);
  }

  @Public()
  @Query(() => [Reader], { name: 'readers' })
  async findAll() {
    return await this.readersService.findAll();
  }

  @Query(() => Reader, { name: 'reader' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.readersService.findOne(id);
  }

  @Mutation(() => Reader)
  async updateReader(
    @Args('updateReaderInput') updateReaderInput: UpdateReaderInput,
  ) {
    return await this.readersService.update(
      updateReaderInput.id,
      updateReaderInput,
    );
  }

  @Mutation(() => Reader)
  async removeReader(@Args('id', { type: () => String }) id: string) {
    return await this.readersService.remove(id);
  }
}
