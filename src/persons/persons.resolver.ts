import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Person } from './persons.entity';
import { PersonsService } from './persons.service';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => [Person], { name: 'persons' })
  async getPersons(): Promise<Person[]> {
    return this.personsService.findAll();
  }

  @Query(() => Person, { name: 'person' })
  async getPersonById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Person> {
    return this.personsService.findOne(id);
  }

  @Mutation(() => Person)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ): Promise<Person> {
    return this.personsService.createPerson(createPersonInput);
  }

  @Mutation(() => Person)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ): Promise<Person> {
    return this.personsService.updatePerson(updatePersonInput);
  }

  @Mutation(() => Person)
  deletePerson(@Args('id', { type: () => ID }) id: number): Promise<Person> {
    return this.personsService.deletePerson(id);
  }
}
