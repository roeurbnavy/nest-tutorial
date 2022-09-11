import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthorBooksService } from './author-books.service';
import { AuthorBooksResolver } from './author-books.resolver';
import { AuthorBook } from './entities/author-book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorBook])],
  providers: [AuthorBooksResolver, AuthorBooksService],
})
export class AuthorBooksModule {}
