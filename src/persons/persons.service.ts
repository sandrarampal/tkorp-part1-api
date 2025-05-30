import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './persons.entity';
import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';

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
    const person = await this.findOne(id);
    await this.personsRepository.remove(person);
    return person;
  }
}
