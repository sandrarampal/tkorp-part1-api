import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './persons.entity';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

interface MostAnimalsOwnedResult {
  personId: number;
  personFirstName: string;
  personLastName: string;
  animalCount: number;
}

interface HeaviestGroupResult {
  personId: number;
  personFirstName: string;
  personLastName: string;
  totalWeight: number;
}

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personsRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personsRepository.find({ relations: ['animals'] });
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personsRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID "${id}" not found.`);
    }
    return person;
  }

  createPerson(createpersonInput: CreatePersonInput): Promise<Person> {
    const newperson = this.personsRepository.create(createpersonInput);
    return this.personsRepository.save(newperson);
  }

  async updatePerson(updatepersonInput: UpdatePersonInput): Promise<Person> {
    const { id, ...restOfInput } = updatepersonInput;
    const person = await this.findOne(id);
    if (!person) {
      throw new NotFoundException(`person with ID "${id}" not found.`);
    }
    Object.assign(person, restOfInput);
    return this.personsRepository.save(person);
  }

  async deletePerson(id: number): Promise<Person> {
    const personToRemove = await this.personsRepository.findOne({
      where: { id },
    });
    if (!personToRemove) {
      throw new NotFoundException(`Person with ID "${id}" not found.`);
    }
    const removedPersonData = { ...personToRemove };
    await this.personsRepository.remove(personToRemove);
    return removedPersonData;
  }

  //Qui possède le plus d'animaux?
  async findMostAnimalsOwned(): Promise<MostAnimalsOwnedResult[]> {
    const mostAnimalOwned = await this.personsRepository
      .createQueryBuilder('person')
      .leftJoin('person.animals', 'animal')
      .select('person.id', 'personId')
      .addSelect('person.firstName', 'personFirstName')
      .addSelect('person.lastName', 'personLastName')
      .addSelect('COUNT(animal.id)', 'animalCount')
      .groupBy('person.id')
      .orderBy('animalCount', 'DESC')
      .getRawMany<MostAnimalsOwnedResult>();

    return mostAnimalOwned;
    //Les personnes ayant le plus d'animaux sont Sophia Brown (id: 18), Michael Taylor (id: 208) et Sarah White (id: 268) qui ont chacun 6 animaux.
  }

  //Qui possède le plus de chat?
  async findMostCatsOwned(): Promise<MostAnimalsOwnedResult[]> {
    const mostCatsOwned = await this.personsRepository
      .createQueryBuilder('person')
      .leftJoin('person.animals', 'animal')
      .where('animal.species = :species', { species: 'Cat' })
      .select('person.id', 'personId')
      .addSelect('person.firstName', 'personFirstName')
      .addSelect('person.lastName', 'personLastName')
      .addSelect('COUNT(animal.id)', 'animalCount')
      .groupBy('person.id')
      .orderBy('animalCount', 'DESC')
      .getRawMany<MostAnimalsOwnedResult>();

    return mostCatsOwned;
    //La personne ayant le plus de chats est Sarah White (id: 268) qui en possède 4.
  }

  //Qui a le groupe d'animaux le plus lourd?
  async findHeaviestGroup(): Promise<HeaviestGroupResult[]> {
    const heaviestGroup = await this.personsRepository
      .createQueryBuilder('person')
      .leftJoin('person.animals', 'animal')
      .select('person.id', 'personId')
      .addSelect('person.firstName', 'personFirstName')
      .addSelect('person.lastName', 'personLastName')
      .addSelect('SUM(animal.weight)', 'totalWeight')
      .where('animal.weight IS NOT NULL')
      .groupBy('person.id')
      .orderBy('totalWeight', 'DESC')
      .getRawMany<HeaviestGroupResult>();

    return heaviestGroup;
    //Sophia Brown (id: 18) a le groupe d'animaux le plus lourd, à 172152g.
  }
}
