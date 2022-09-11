import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput) {
    try {
      return await this.bookRepo.save(this.bookRepo.create(createBookInput));
    } catch (error) {
      console.log('create book error', error);
    }
  }

  async findAll() {
    const res = await this.bookRepo.find({
      relations: {
        author: true,
        borrow: true,
      },
    });
    return res;
  }

  async findOne(id: string) {
    return await this.bookRepo.findOne({
      where: { id: id },
      relations: { author: true },
    });
  }

  update(id: string, updateBookInput: UpdateBookInput) {
    const res = this.bookRepo.update(id, { ...updateBookInput });

    return res;
  }

  remove(id: string) {
    return this.bookRepo.delete(id);
  }
}
