import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

interface Species {
  species: string;
  count: number;
}

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

  //création d'un animal
  createAnimal(createAnimalInput: CreateAnimalInput): Promise<Animal> {
    const newAnimal = this.animalsRepository.create(createAnimalInput);
    return this.animalsRepository.save(newAnimal);
  }

  //Modification d'un animal
  async updateAnimal(updateAnimalInput: UpdateAnimalInput): Promise<Animal> {
    const { id, ...restOfInput } = updateAnimalInput;
    const animal = await this.findOne(id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID "${id}" not found.`);
    }
    Object.assign(animal, restOfInput);
    return this.animalsRepository.save(animal);
  }

  //Suppression d'un animal
  async deleteAnimal(id: number): Promise<Animal> {
    const animalToRemove = await this.animalsRepository.findOne({
      where: { id },
    });
    if (!animalToRemove) {
      throw new NotFoundException(`Animal with ID "${id}" not found.`);
    }
    //copie de des data de l'animal pour pouvoir les retourner en réponse au client
    const removedAnimalData = { ...animalToRemove };
    await this.animalsRepository.remove(animalToRemove);
    return removedAnimalData;
  }

  //Trouvons l'animal le plus vieux
  async findOldestAnimal(): Promise<Animal[]> {
    const oldestAnimal = await this.animalsRepository
      .createQueryBuilder('animal')
      .orderBy('animal.dateOfBirth', 'ASC')
      .getMany();
    return oldestAnimal || null;
    //L'animal le plus vieux est Rocky (ID: 934), un lapin né le 20-09-2009.
  }

  //Trouvons l'espèce la plus représentée
  async findMostRepresentatedSpecies(): Promise<Species | null> {
    const result = await this.animalsRepository
      .createQueryBuilder('animal')
      .select('animal.species', 'species')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('animal.species')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne<Species>();
    return result || null;
  }
  //L'animal le plus représenté est "Bird" qui apparaît 179 fois

  //Quel est l'animal le plus lourd, qui le possède?
  async findHeaviestAnimal(): Promise<Animal[]> {
    const heaviestAnimal = await this.animalsRepository
      .createQueryBuilder('animal')
      .orderBy('animal.weight', 'DESC')
      .leftJoinAndSelect('animal.persons', 'persons')
      .getMany();

    return heaviestAnimal;
    //L'animal le plus lourd est Chloe, un caniche de 49937g (une belle bête!) qui appartient à Emma Smith (id: 209)
  }
}
