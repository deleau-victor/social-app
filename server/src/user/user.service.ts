import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserInput, createUserOutput } from './dto/user-create.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(input: createUserInput): Promise<createUserOutput> {
    const user = this.userRepository.create(input);
    await user.save();
    return { user };
  }

  async getUser(email: User['email']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email });
  }

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }
}
