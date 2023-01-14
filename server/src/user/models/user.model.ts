import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/models/article.model';
import { Node } from 'src/pagination/models/node.model';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comment/models/comment.model';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;
  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string | null;

  @OneToMany(() => Article, (target) => target.author)
  @JoinColumn()
  articles: Article[];

  @OneToMany(() => Comment, (target) => target.author)
  @JoinColumn()
  comments: Comment[];
}
