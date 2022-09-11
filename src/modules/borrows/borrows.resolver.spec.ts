import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsResolver } from './borrows.resolver';
import { BorrowsService } from './borrows.service';

describe('BorrowsResolver', () => {
  let resolver: BorrowsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowsResolver, BorrowsService],
    }).compile();

    resolver = module.get<BorrowsResolver>(BorrowsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
