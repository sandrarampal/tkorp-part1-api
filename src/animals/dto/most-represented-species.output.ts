import { ObjectType, Field, Int } from '@nestjs/graphql';

//On crée un nouvel objet type contenant l'espèce de l'animal et le nombre de fois où elle apparaît.
@ObjectType()
export class MostRepresentedSpeciesOutput {
  @Field()
  species: string;

  @Field(() => Int)
  count: number;
}
