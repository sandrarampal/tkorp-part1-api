import { Field, Int, ObjectType, Scalar } from "@nestjs/graphql";
import { GraphQLISODateTime } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Animal{

@PrimaryGeneratedColumn()
@Field(type => Int)
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
@Field(type => Int)
weight: number;
}