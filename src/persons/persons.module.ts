import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService, PersonsResolver]
})
export class PersonsModule {}
