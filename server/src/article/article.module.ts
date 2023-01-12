import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';
import { ArticleFieldsResolver } from './resolvers/article.fields.resolver';
import { UsersModule } from 'src/user/user.module';
import { Comment } from 'src/comment/models/comment.model';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment]), UsersModule],
  providers: [
    ArticleService,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleFieldsResolver,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
