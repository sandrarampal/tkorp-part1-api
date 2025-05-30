import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnimalInput {
  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  dateOfBirth: Date;

  @Field()
  species: string;

  @Field()
  breed: string;

  @Field()
  color: string;

  @Field((type) => Int)
  weight: number;

  @Field((type) => Int)
  ownerId: number;
}
