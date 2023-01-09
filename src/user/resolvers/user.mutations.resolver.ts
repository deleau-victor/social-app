import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { createUserInput, createUserOutput } from '../dto/user-create.dto';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(User)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => createUserOutput)
  async createUser(@Args('input') input: createUserInput) {
    return this.userService.createUser(input);
  }
}
