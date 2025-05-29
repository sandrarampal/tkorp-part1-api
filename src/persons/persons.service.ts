import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonsService {
    async getPersons(){
        console.log("PersonsService triggered");
        return{}
        
    }
}
