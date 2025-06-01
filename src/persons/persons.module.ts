import { Module } from '@nestjs/common';
import { Person } from './persons.entity';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonsService, PersonsResolver],
})
export class PersonsModule {}
