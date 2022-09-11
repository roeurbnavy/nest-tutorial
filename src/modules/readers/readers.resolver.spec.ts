import { Test, TestingModule } from '@nestjs/testing';
import { ReadersResolver } from './readers.resolver';
import { ReadersService } from './readers.service';

describe('ReadersResolver', () => {
  let resolver: ReadersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadersResolver, ReadersService],
    }).compile();

    resolver = module.get<ReadersResolver>(ReadersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
