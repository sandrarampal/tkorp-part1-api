import { Query, Resolver } from '@nestjs/graphql';
import { Person } from './persons.entity';
import { PersonsService } from './persons.service';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => [Person], { name: 'persons' })
  async getPersons(): Promise<Person[]> {
    return this.personsService.findAll();
  }
}
