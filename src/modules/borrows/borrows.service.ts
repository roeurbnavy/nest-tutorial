import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';
import { Borrow } from './entities/borrow.entity';
import { BorrowDetails } from './entities/borrow_detail.entity';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow) private readonly repoBorrow: Repository<Borrow>,
    @InjectRepository(BorrowDetails)
    private readonly repoBorrowDetails: Repository<BorrowDetails>,
  ) {}

  async create(createBorrowInput: CreateBorrowInput) {
    try {
      const { doc, details } = createBorrowInput;
      const resSave = await this.repoBorrow.save(this.repoBorrow.create(doc));
      const parentId = resSave.id;
      for (const it of details) {
        it['parentId'] = parentId;
      }
      this.repoBorrowDetails.save(this.repoBorrowDetails.create(details));

      return resSave;
    } catch (error) {
      console.log('create borrow error', error);
    }
  }

  async findAll() {
    const doc = await this.repoBorrow.find({
      relations: { reader: true, details: { books: { author: true } } },
    });

    return doc;
  }

  findOne(id: string) {
    return this.repoBorrow.findOne({
      where: { id: id },
      relations: { reader: true, details: { books: { author: true } } },
    });
  }

  async update(id: string, updateBorrowInput: UpdateBorrowInput) {
    const { doc, details: details = [] } = updateBorrowInput;

    const res = await this.repoBorrow.update(id, { ...doc });

    // delete before insert
    await this.repoBorrowDetails
      .createQueryBuilder('borrowDetails')
      .delete()
      .where('parentId=:parentId', { parentId: id })
      .execute();

    if (details.length) {
      for (const it of details) {
        it['parentId'] = id;
      }
      await this.repoBorrowDetails.save(this.repoBorrowDetails.create(details));
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const res = await this.repoBorrow.delete(id);

    // delete
    await this.repoBorrowDetails
      .createQueryBuilder('borrowDetails')
      .delete()
      .where('parentId=:parentId', { parentId: id })
      .execute();
    return res;
  }
}
