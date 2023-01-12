import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';

@InputType()
export class CommentCreateInput {
  @Field(() => String)
  articleId: string;

  @Field(() => String)
  body: string;
}

@ObjectType()
export class CommentCreateOutput {
  @Field(() => Comment)
  comment: Comment;
}
