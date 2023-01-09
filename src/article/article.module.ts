import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';
import { ArticleFieldsResolver } from './resolvers/article.fields.resolver';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UsersModule],
  providers: [
    ArticleService,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleFieldsResolver,
  ],
})
export class ArticleModule {}
