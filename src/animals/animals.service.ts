import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.find({ relations: ['persons'] });
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalsRepository.findOne({
      where: { id },
      relations: ['persons'],
    });
    if (!animal) {
      throw new NotFoundException(`Animal with ID "${id}" not found.`);
    }
    return animal;
  }

  createAnimal(createAnimalInput: CreateAnimalInput): Promise<Animal> {
    const newAnimal = this.animalsRepository.create(createAnimalInput);
    return this.animalsRepository.save(newAnimal);
  }

  async updateAnimal(updateAnimalInput: UpdateAnimalInput): Promise<Animal> {
    const { id, ...restOfInput } = updateAnimalInput;
    const animal = await this.findOne(id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID "${id}" not found.`);
    }
    Object.assign(animal, restOfInput);
    return this.animalsRepository.save(animal);
  }

  async deleteAnimal(id: number): Promise<Animal> {
    const animal = await this.findOne(id);
    await this.animalsRepository.remove(animal);
    return animal;
  }
}
