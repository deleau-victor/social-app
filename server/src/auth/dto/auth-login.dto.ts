import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class authLoginOutput {
  @Field(() => String)
  accessToken: string;
}
