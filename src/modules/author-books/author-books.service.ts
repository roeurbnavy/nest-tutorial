import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorBookInput } from './dto/create-author-book.input';
import { UpdateAuthorBookInput } from './dto/update-author-book.input';
import { AuthorBook } from './entities/author-book.entity';

@Injectable()
export class AuthorBooksService {
  constructor(
    @InjectRepository(AuthorBook)
    private readonly authorBooksRepo: Repository<AuthorBook>,
  ) {}

  async create(createAuthorBookInput: CreateAuthorBookInput) {
    return await this.authorBooksRepo.save(
      this.authorBooksRepo.create(createAuthorBookInput),
    );
  }

  async findAll() {
    try {
      // same result
      // const res = await this.authorBooksRepo
      //   .createQueryBuilder('authorBooks')
      //   .leftJoinAndSelect('authorBooks.book', 'books')
      //   .getMany();
      const res = await this.authorBooksRepo.find({
        relations: { book: true },
      });

      return res;
    } catch (error) {
      console.log('author find error', error);
    }
  }

  async findOne(id: string) {
    const res = await this.authorBooksRepo.findOne({
      where: { id: id },
      relations: { book: true },
    });
    return res;
  }

  async update(id: string, updateAuthorBookInput: UpdateAuthorBookInput) {
    return await this.authorBooksRepo.update(id, { ...updateAuthorBookInput });
  }

  remove(id: string) {
    return this.authorBooksRepo.delete(id);
  }
}
