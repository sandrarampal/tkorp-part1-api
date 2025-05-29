import { Field, Int, ObjectType} from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Person{

@PrimaryGeneratedColumn()
@Field(type => Int)
id: number;

@Column()
@Field()
lastName: string;

@Column()
@Field()
firstName: string;

@Column()
@Field()
email: string;

@Column()
@Field(type => Int)
phoneNumber: number;
}