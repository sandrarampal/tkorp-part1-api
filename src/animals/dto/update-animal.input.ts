import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.input';

@InputType()
export class UpdateAnimalInput extends PartialType(CreateAnimalInput) {
  @Field(() => ID)
  id: number;
}
