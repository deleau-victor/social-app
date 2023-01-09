import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Node } from '../../pagination/models/node.model';

@Entity()
@ObjectType()
export class Comment extends Node {
  @Field(() => String)
  @Column()
  body: string;

  @Field(() => String)
  @Column()
  image: string;

  @Field(() => String)
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @RelationId((self: Comment) => self.author)
  readonly authorId: User['id'];
}
