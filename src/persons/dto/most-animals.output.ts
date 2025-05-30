import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MostAnimalOwnedOutput {
  @Field(() => Int)
  personId: number;

  @Field()
  personFirstName: string;

  @Field({ nullable: true })
  personLastName?: string;

  @Field(() => Int)
  animalCount: number;
}
