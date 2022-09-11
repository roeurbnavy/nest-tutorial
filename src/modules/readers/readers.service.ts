import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReaderInput } from './dto/create-reader.input';
import { UpdateReaderInput } from './dto/update-reader.input';
import { Reader } from './entities/reader.entity';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader) private readonly readerRepo: Repository<Reader>,
  ) {}

  async create(createReaderInput: CreateReaderInput) {
    return await this.readerRepo.save(
      this.readerRepo.create(createReaderInput),
    );
  }

  async findAll() {
    // {
    //   relations: { borrow: { books: { author: true } } },
    // }
    return await this.readerRepo.find();
  }

  async findOne(id: string) {
    return await this.readerRepo.findOneBy({ id: id });
  }

  async update(id: string, updateReaderInput: UpdateReaderInput) {
    // return `This action updates a #${id} reader`;

    const res = await this.readerRepo.update(id, { ...updateReaderInput });
    console.log('update reader', res);
    return res;
  }

  async remove(id: string) {
    return await this.readerRepo.delete(id);
  }
}
