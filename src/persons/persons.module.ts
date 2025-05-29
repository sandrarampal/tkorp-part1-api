import { Module } from '@nestjs/common';
import { Person } from './persons.entity';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]), 
  ],
  controllers: [PersonsController],
  providers: [PersonsService, PersonsResolver]
})
export class PersonsModule {}
