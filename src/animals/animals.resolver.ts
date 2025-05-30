import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

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
}
