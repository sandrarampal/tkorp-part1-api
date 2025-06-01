import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Person } from '../persons.entity';

@ObjectType()
export class PaginatedPersons {
  @Field(() => [Person], {
    description: 'List of Persons for the current page',
  })
  items: Person[];

  @Field(() => Int, {
    description: 'Total number of items available across all pages',
  })
  totalCount: number;

  @Field(() => Int, { description: 'Number of items skipped (offset)' })
  offset: number;

  @Field(() => Int, { description: 'Maximum number of items per page (limit)' })
  limit: number;
}
