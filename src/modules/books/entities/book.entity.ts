import { AuthorBook } from '@/modules/author-books/entities/author-book.entity';
import { Borrow } from '@/modules/borrows/entities/borrow.entity';
import { BorrowDetails } from '@/modules/borrows/entities/borrow_detail.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'books' })
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255 })
  title: string;

  @Field(() => AuthorBook)
  @ManyToOne(() => AuthorBook, (author) => author.book)
  @JoinColumn({ name: 'authorId' })
  author: AuthorBook;

  @Field()
  @Column('uuid')
  authorId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pubYear?: Date;

  @Field(() => [BorrowDetails])
  @OneToMany(() => BorrowDetails, (detail) => detail.books)
  borrow: BorrowDetails[];
}
