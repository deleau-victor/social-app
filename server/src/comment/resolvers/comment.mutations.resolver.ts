import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dto/comment-create.dto';
import { JwtPayload } from 'src/auth/auth.service';

@Resolver(Comment)
export class CommentMutationsResolver {
  constructor(private readonly CommentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async createComment(
    @Args('input') input: CommentCreateInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return await this.CommentService.createComment(input, user);
  }
}
