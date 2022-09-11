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
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Borrow } from './borrow.entity';

@ObjectType()
@Entity({ name: 'borrowDetails' })
export class BorrowDetails {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Borrow)
  @ManyToOne(() => Borrow, (borrow) => borrow.details)
  @JoinColumn({ name: 'parentId' })
  borrow: Borrow;

  @Field()
  @Column('uuid')
  parentId: string;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.borrow)
  @JoinColumn({ name: 'bookId' })
  books: Book;

  @Field()
  @Column('uuid')
  bookId: string;
}
