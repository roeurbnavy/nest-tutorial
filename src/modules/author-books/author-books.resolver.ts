import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorBooksService } from './author-books.service';
import { AuthorBook } from './entities/author-book.entity';
import { CreateAuthorBookInput } from './dto/create-author-book.input';
import { UpdateAuthorBookInput } from './dto/update-author-book.input';

@Resolver(() => AuthorBook)
export class AuthorBooksResolver {
  constructor(private readonly authorBooksService: AuthorBooksService) {}

  @Mutation(() => AuthorBook)
  createAuthorBook(
    @Args('createAuthorBookInput') createAuthorBookInput: CreateAuthorBookInput,
  ) {
    return this.authorBooksService.create(createAuthorBookInput);
  }

  @Query(() => [AuthorBook], { name: 'authorBooks' })
  findAll() {
    return this.authorBooksService.findAll();
  }

  @Query(() => AuthorBook, { name: 'authorBook' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorBooksService.findOne(id);
  }

  @Mutation(() => AuthorBook)
  updateAuthorBook(
    @Args('updateAuthorBookInput') updateAuthorBookInput: UpdateAuthorBookInput,
  ) {
    return this.authorBooksService.update(
      updateAuthorBookInput.id,
      updateAuthorBookInput,
    );
  }

  @Mutation(() => AuthorBook)
  removeAuthorBook(@Args('id', { type: () => Int }) id: string) {
    return this.authorBooksService.remove(id);
  }
}
