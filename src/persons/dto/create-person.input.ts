import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
