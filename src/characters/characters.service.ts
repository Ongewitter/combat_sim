import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { Character } from '../models/character';
import { RULESETS } from '../data/rulesets';

// This service is responsible for data storage and retrieval
@Injectable()
export class CharacterService {
  private readonly characters: Array<Character> = [];

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
      (e) => e.id == parseInt(id),
    );
    this.characters.splice(characterIndex, 1);
    return this.characters;
  }

  findAll(): Array<Character> {
    return this.characters;
  }
}
