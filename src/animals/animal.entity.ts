import { Field, Int, ObjectType, Scalar } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { Person } from 'src/persons/persons.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('animals')
@ObjectType()
export class Animal {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => GraphQLISODateTime)
  dateOfBirth: Date;

  @Column()
  @Field()
  species: string;

  @Column()
  @Field()
  breed: string;

  @Column()
  @Field()
  color: string;

  @Column()
  @Field((type) => Int)
  weight: number;

  @ManyToOne(() => Person, (persons) => persons.animals)
  @JoinColumn({ name: 'ownerId' }) //faire le lien des animaux à un maître (un seul maître par animal)
  @Field(() => Person)
  persons: Person;

  @Column()
  @Field((type) => Int)
  ownerId: number;
}
