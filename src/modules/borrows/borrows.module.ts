import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsResolver } from './borrows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { BorrowDetails } from './entities/borrow_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, BorrowDetails])],
  providers: [BorrowsResolver, BorrowsService],
})
export class BorrowsModule {}
