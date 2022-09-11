import { Book } from '@/modules/books/entities/book.entity';
import { Reader } from '@/modules/readers/entities/reader.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BorrowDetails } from './borrow_detail.entity';

enum bookIds {}

@ObjectType()
@Entity({ name: 'borrows' })
export class Borrow {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  tranDate: Date;

  @Field()
  @Column()
  returnDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note?: string;

  @Field(() => Reader)
  @ManyToOne(() => Reader, (reader) => reader.borrow)
  @JoinColumn({ name: 'readerId' })
  reader: Reader;

  @Field()
  @Column('uuid')
  readerId: string;

  @Field(() => [BorrowDetails])
  @OneToMany(() => BorrowDetails, (detail) => detail.borrow)
  details: BorrowDetails[];
}
