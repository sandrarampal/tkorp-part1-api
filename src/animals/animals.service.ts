import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';

@Injectable()
export class AnimalsService {
    constructor(
        @InjectRepository(Animal)
        private animalsRepository: Repository<Animal>
    ){}

    async findAll(): Promise<Animal[]>{
        return this.animalsRepository.find({relations:['persons']})
    }
}

