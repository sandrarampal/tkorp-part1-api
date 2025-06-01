import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Animal } from '../animal.entity';

@ObjectType()
export class PaginatedAnimals {
  @Field(() => [Animal], {
    description: 'List of animals for the current page',
  })
  items: Animal[];

  @Field(() => Int, {
    description: 'Total number of items available across all pages',
  })
  totalCount: number;

  @Field(() => Int, { description: 'Number of items skipped (offset)' })
  offset: number;

  @Field(() => Int, { description: 'Maximum number of items per page (limit)' })
  limit: number;
}
