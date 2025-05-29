import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService){}

    @Get()
    async getPersons(){
        const data = await this.personsService.getPersons();
        return data
    }
}
