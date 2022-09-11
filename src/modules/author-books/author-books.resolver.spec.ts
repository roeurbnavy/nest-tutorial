import { Test, TestingModule } from '@nestjs/testing';
import { AuthorBooksResolver } from './author-books.resolver';
import { AuthorBooksService } from './author-books.service';

describe('AuthorBooksResolver', () => {
  let resolver: AuthorBooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorBooksResolver, AuthorBooksService],
    }).compile();

    resolver = module.get<AuthorBooksResolver>(AuthorBooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
