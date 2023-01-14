import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserInput, createUserOutput } from './dto/user-create.dto';
import { User } from './models/user.model';
import { hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(input: createUserInput): Promise<createUserOutput> {
    const isAlreadyRegistered = await this.userRepository.findOneBy({
      email: input.email,
    });
    if (isAlreadyRegistered) {
      throw new Error('Email déjà utilisée');
    }
    input.password = hashSync(input.password, 10);
    const user = this.userRepository.create(input);
    await user.save();
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = this.jwtService.sign(payload);
    delete user.password;
    return { user, accessToken: accessToken };
  }

  async getUser(email: User['email']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ email });
  }

  async getUserById(id: User['id']): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }
}
