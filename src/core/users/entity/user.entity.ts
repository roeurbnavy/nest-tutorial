import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PasswordTransformer } from '../password.transformer';
import { AppRoles } from '@/common/enum/role.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity({
  name: 'users',
})
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255, unique: true })
  username: string;

  @Field()
  @Column({ type: 'text' })
  name: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Field(() => [String])
  @Column({
    type: 'simple-array',
    enum: AppRoles,
    default: AppRoles.DEFAULT,
  })
  roles: AppRoles[];

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field()
  @DeleteDateColumn()
  deletedDate: Date;

  @Field()
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  toJson() {
    const { password, ...self } = this;

    return self;
  }
}
