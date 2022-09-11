import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BorrowsService } from './borrows.service';
import { Borrow } from './entities/borrow.entity';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';
import { Public } from '@/common/decorator/public.decorator';

@Resolver(() => Borrow)
export class BorrowsResolver {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Public()
  @Mutation(() => Borrow)
  async createBorrow(
    @Args('createBorrowInput')
    createBorrowInput: CreateBorrowInput,
  ) {
    return await this.borrowsService.create(createBorrowInput);
  }

  @Public()
  @Query(() => [Borrow], { name: 'borrows' })
  async findAll() {
    return await this.borrowsService.findAll();
  }

  @Query(() => Borrow, { name: 'borrow' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.borrowsService.findOne(id);
  }

  @Public()
  @Mutation(() => Borrow)
  async updateBorrow(
    @Args('updateBorrowInput') updateBorrowInput: UpdateBorrowInput,
  ) {
    return await this.borrowsService.update(
      updateBorrowInput.id,
      updateBorrowInput,
    );
  }

  @Mutation(() => Borrow)
  async removeBorrow(@Args('id', { type: () => String }) id: string) {
    return await this.borrowsService.remove(id);
  }
}
