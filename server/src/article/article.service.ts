import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/auth.service';
import {
  PaginationArgs,
  SortDirection,
} from 'src/pagination/dto/pagination.dto';
import { User } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import {
  ArticlesPagination,
  ArticlesPaginationArgs,
} from './dto/article-pagination.dto';
import { ArticleUpdateInput } from './dto/article-update.dto';
import { Article } from './models/article.model';
import { Comment } from '../comment/models/comment.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createArticle(
    user: JwtPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
    article.author = new User();
    article.author.id = user.id;
    await article.save();
    return { article };
  }

  async updateArticle(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleCreateOutput> {
    const article = await this.articleRepository.findOneByOrFail({
      id: articleId,
    });
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;
    await article.save();
    return { article };
  }

  async deleteArticle(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOneByOrFail({
      id: articleId,
    });
    await article.remove();
    return { articleId };
  }

  async getArticleById(articleId: Article['id']): Promise<Article> {
    return await this.articleRepository.findOneByOrFail({ id: articleId });
  }

  async articlesPagination(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPagination> {
    const qb = this.articleRepository.createQueryBuilder('article');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt !== undefined) {
        qb.addOrderBy(
          'article.createdAt',
          args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
      if (args.sortBy.title !== undefined) {
        qb.addOrderBy(
          'article.title',
          args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
        );
      }
    }
    const [nodes, totalCount] = await qb.getManyAndCount();
    return { nodes, totalCount };
  }

  async articleCommentsPagination(
    articleId: Article['id'],
    args: PaginationArgs,
  ) {
    const [nodes, totalCount] = await this.commentRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      where: { article: { id: articleId } },
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });
    return { nodes, totalCount };
  }
}
