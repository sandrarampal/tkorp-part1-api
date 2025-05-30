import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HeaviestGroupOutput {
  @Field(() => Int)
  personId: number;

  @Field()
  personFirstName: string;

  @Field({ nullable: true })
  personLastName?: string;

  @Field(() => Int)
  totalWeight: number;
}
