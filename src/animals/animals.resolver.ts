import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { MostRepresentedSpeciesOutput } from './dto/most-represented-species.output';

@Resolver()
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Query(() => [Animal], { name: 'animals' })
  async getAnimals(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  @Query(() => Animal, { name: 'animal' })
  async getAnimalById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Animal> {
    return this.animalsService.findOne(id);
  }

  @Mutation(() => Animal)
  createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
  ): Promise<Animal> {
    return this.animalsService.createAnimal(createAnimalInput);
  }

  @Mutation(() => Animal)
  updateAnimal(
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    return this.animalsService.updateAnimal(updateAnimalInput);
  }

  @Mutation(() => Animal)
  deleteAnimal(@Args('id', { type: () => ID }) id: number): Promise<Animal> {
    return this.animalsService.deleteAnimal(id);
  }

  @Query(() => [Animal], { name: 'oldestAnimal', nullable: true })
  async getOldestAnimal(): Promise<Animal[]> {
    return this.animalsService.findOldestAnimal();
  }

  @Query(() => MostRepresentedSpeciesOutput, {
    name: 'mostRepresentedSpecies',
    nullable: true,
  })
  async getMostRepresentedSpecies(): Promise<MostRepresentedSpeciesOutput | null> {
    return this.animalsService.findMostRepresentatedSpecies();
  }

  @Query(() => [Animal], { name: 'heaviestAnimal', nullable: true })
  async getHeaviestAnimal(): Promise<Animal[]> {
    return this.animalsService.findHeaviestAnimal();
  }
}
