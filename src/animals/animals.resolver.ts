import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { MostRepresentedSpeciesOutput } from './dto/most-represented-species.output';
import { PaginationArgs } from 'src/common/pagination';
import { PaginatedAnimals } from './dto/paginated-animals.output';

@Resolver()
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  //utilisation de PaginatedAnimals pour obtenir les données de limit/offset et totalCount
  @Query(() => PaginatedAnimals, { name: 'animals' })
  async getAnimals(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<PaginatedAnimals> {
    return this.animalsService.findAll(paginationArgs);
  }

  //query animal by id
  @Query(() => Animal, { name: 'animal' })
  async getAnimalById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Animal> {
    return this.animalsService.findOne(id);
  }

  //création d'un animal
  @Mutation(() => Animal)
  createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
  ): Promise<Animal> {
    return this.animalsService.createAnimal(createAnimalInput);
  }

  //Modification d'un animal
  @Mutation(() => Animal)
  updateAnimal(
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    return this.animalsService.updateAnimal(updateAnimalInput);
  }

  //Suppression d'un animal
  @Mutation(() => Animal)
  deleteAnimal(@Args('id', { type: () => Int }) id: number): Promise<Animal> {
    return this.animalsService.deleteAnimal(id);
  }

  //rechercher l'animal le plus vieux
  @Query(() => [Animal], { name: 'oldestAnimal', nullable: true })
  async getOldestAnimal(): Promise<Animal[]> {
    return this.animalsService.findOldestAnimal();
  }

  //rechercher l'espèce la plus représentée
  @Query(() => MostRepresentedSpeciesOutput, {
    name: 'mostRepresentedSpecies',
    nullable: true,
  })
  async getMostRepresentedSpecies(): Promise<MostRepresentedSpeciesOutput | null> {
    return this.animalsService.findMostRepresentatedSpecies();
  }

  //rechercher l'animal le plus lourd
  @Query(() => [Animal], { name: 'heaviestAnimal', nullable: true })
  async getHeaviestAnimal(): Promise<Animal[]> {
    return this.animalsService.findHeaviestAnimal();
  }
}
