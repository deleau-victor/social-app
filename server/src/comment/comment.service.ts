import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { JwtPayload } from 'src/auth/auth.service';
import { User } from 'src/user/models/user.model';
import { Repository } from 'typeorm';
import { CommentCreateInput } from './dto/comment-create.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
  ) {}

  async createComment(input: CommentCreateInput, user: JwtPayload) {
    const article = await this.articleService.getArticleById(input.articleId);
    const comment = await this.CommentRepository.create(input);
    comment.author = new User();
    comment.author.id = user.id;
    comment.article = article;
    comment.body = input.body;
    await comment.save();
    return { comment };
  }
}
