import { Field, Int, ObjectType} from "@nestjs/graphql";
import { Animal } from "src/animals/animal.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('persons')
@ObjectType()
export class Person{

@PrimaryGeneratedColumn()
@Field(type => Int)
id: number;

@Column({name: 'lastName', type:'varchar', length:'255'})
@Field()
lastName: string;

@Column({name: 'firstName', type:'varchar', length:'255'})
@Field()
firstName: string;

@Column({name: 'email', type:'varchar', length:'255'})
@Field()
email: string;

@Column({name: 'phoneNumber', type:'char', length:'10'})
@Field()
phoneNumber: string;

@OneToMany(() => Animal, (animals) => animals.persons)
@Field(() => [Animal],{ nullable: true })
animals: Animal[]
}