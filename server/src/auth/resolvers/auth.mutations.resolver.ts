import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { authLoginOutput } from '../dto/auth-login.dto';
import { LocalAuthGuard } from '../guards/local-host.guard';

@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => authLoginOutput)
  async login(
    @Context('req') req,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(req.user);
  }
}
