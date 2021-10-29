import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { Character } from '../models/character';
import { RULESETS } from '../data/rulesets';

// This service is responsible for data storage and retrieval
@Injectable()
export class CharacterService {
  private characters: Array<Character> = [];

  index(){
    return this.characters;
  }

  create(characterDto: CreateCharacterDto) {
    // eslint-disable-next-line prefer-const
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { ruleset, ...characterOptions } = characterDto;
    const newCharacter = {
      id: this.characters.length,
      ...characterOptions,
    };
    // TODO Implement ruleset validation
    // if(!ruleset) { ruleset = 'DnD'; }
    // RULESETS[ruleset].validateCharacter(newCharacter);
    this.characters.push(newCharacter);
    return this.characters[this.characters.length - 1];
  }

  delete(id: string){
    const characterIndex = this.characters.findIndex(
      (e) => e.id === parseInt(id),
    );
    console.log(this.characters);
    this.characters.splice(characterIndex, 1);
    console.log(this.characters);
    return this.characters;
  }

  findAll(): Array<Character> {
    return this.characters;
  }
}
