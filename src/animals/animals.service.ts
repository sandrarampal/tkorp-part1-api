import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { PaginationArgs } from 'src/common/pagination';
import { PaginatedAnimals } from './dto/paginated-animals.output';

//interface permettant d'afficher chaque espèce et le nombre d'animaux pour chaque.
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

  //Récupérer tous les animaux avec un système de pagination
  async findAll(paginationArgs: PaginationArgs): Promise<PaginatedAnimals> {
    const { limit, offset } = paginationArgs;

    const [items, totalCount] = await this.animalsRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['persons'],
      order: { id: 'ASC' },
    });

    return {
      items,
      totalCount,
      offset,
      limit,
    };
  }

  //trouver un animal avec son Id
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
      .orderBy('animal.dateOfBirth', 'ASC') //ordonner les animaux selon leur date de naissance
      .getMany();
    return oldestAnimal || null;
    //L'animal le plus vieux est Rocky (ID: 934), un lapin né le 20-09-2009.
  }

  //Trouvons l'espèce la plus représentée
  async findMostRepresentatedSpecies(): Promise<Species | null> {
    const result = await this.animalsRepository
      .createQueryBuilder('animal')
      .select('animal.species', 'species') //choisit le champ "species"
      .addSelect('COUNT(animal.id)', 'count') //compte le nombre d'animaux dans chaque espèce et met la valeur dans une variable count
      .groupBy('animal.species') //regroupe les animaux de chaque espèce
      .orderBy('count', 'DESC') //trie ses groupe en ordre de "count" décroissant
      .limit(1) //donne le plus haut résultat
      .getRawOne<Species>();
    return result || null;
  }
  //L'animal le plus représenté est "Bird" qui apparaît 179 fois

  //Quel est l'animal le plus lourd, qui le possède?
  async findHeaviestAnimal(): Promise<Animal[]> {
    const heaviestAnimal = await this.animalsRepository
      .createQueryBuilder('animal')
      .orderBy('animal.weight', 'DESC')
      .leftJoinAndSelect('animal.persons', 'persons') //récupère le nom de la personne possédant l'animal le plus lourd
      .getMany();

    return heaviestAnimal;
    //L'animal le plus lourd est Chloe, un caniche de 49937g (une belle bête!) qui appartient à Emma Smith (id: 209)
  }
}
