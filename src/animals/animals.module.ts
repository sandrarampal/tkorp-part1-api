import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { AnimalsResolver } from './animals.resolver';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalsResolver]
})
export class AnimalsModule {}
