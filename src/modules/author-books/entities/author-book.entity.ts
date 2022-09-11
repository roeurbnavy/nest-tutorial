import { Book } from '@/modules/books/entities/book.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'authorBooks' })
export class AuthorBook {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.author, {
    cascade: true,
  })
  book: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
