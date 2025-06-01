import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Person } from './persons.entity';
import { PersonsService } from './persons.service';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { MostAnimalOwnedOutput } from './dto/most-animals.output';
import { HeaviestGroupOutput } from './dto/heaviest-group.output';
import { PaginationArgs } from 'src/common/pagination';
import { PaginatedPersons } from './dto/paginate-persons.output';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Query(() => PaginatedPersons, { name: 'persons' })
  async getPersons(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<PaginatedPersons> {
    return this.personsService.findAll(paginationArgs);
  }

  @Query(() => Person, { name: 'person' })
  async getPersonById(
    @Args('id', { type: () => Int }) id: number,
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

  @Query(() => [MostAnimalOwnedOutput], {
    name: 'mostAnimalsOwned',
    nullable: true,
  })
  async getMostAnimalsOwned(): Promise<MostAnimalOwnedOutput[]> {
    return this.personsService.findMostAnimalsOwned();
  }

  @Query(() => [MostAnimalOwnedOutput], {
    name: 'mostCatsOwned',
    nullable: true,
  })
  async getMostCatsOwned(): Promise<MostAnimalOwnedOutput[]> {
    return this.personsService.findMostCatsOwned();
  }

  @Query(() => [HeaviestGroupOutput], {
    name: 'heaviestGroup',
    nullable: true,
  })
  async getHeaviestGroup(): Promise<HeaviestGroupOutput[]> {
    return this.personsService.findHeaviestGroup();
  }
}
