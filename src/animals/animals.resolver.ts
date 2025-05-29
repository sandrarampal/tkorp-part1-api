import { Query, Resolver } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';

@Resolver()
export class AnimalsResolver {
@Query(type => String) // Définit une requête nommée 'hello' qui retourne une chaîne
hello(): string {
    return 'Hello World!';
  }
}
