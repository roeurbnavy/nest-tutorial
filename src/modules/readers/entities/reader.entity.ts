import { Borrow } from '@/modules/borrows/entities/borrow.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'readers' })
export class Reader {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text' })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  email: string;

  @Field(() => [Borrow])
  @OneToMany(() => Borrow, (borrow) => borrow.reader)
  borrow: Borrow[];
}
