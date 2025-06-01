import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 50,
    description: 'Number of items to return',
  })
  @Min(1)
  @Max(50)
  limit: number = 50;

  @Field(() => Int, { defaultValue: 0, description: 'Number of items to skip' })
  @Min(0)
  offset: number = 0;
}
