import { Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from './animal.entity';

@Resolver()
export class AnimalsResolver {
constructor (private readonly animalsService: AnimalsService){}

    @Query(()=>[Animal], {name:'animals'})
    async getAnimals(): Promise<Animal[]>{
        return this.animalsService.findAll()
    }
}
