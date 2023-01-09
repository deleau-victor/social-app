import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JwtPayload } from 'src/auth/auth.service';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from '../article.service';
import {
  ArticleCreateOutput,
  ArticleCreateInput,
} from '../dto/article-create.dto';
import { ArticleDeleteOutput } from '../dto/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto/article-update.dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async createArticle(
    @CurrentUser() user: JwtPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.createArticle(user, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleUpdateOutput)
  async updateArticle(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(articleId, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleDeleteOutput)
  async deleteArticle(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.articleService.deleteArticle(articleId);
  }
}
