import { Injectable } from '@nestjs/common';
import { check } from 'prettier';
import { throwError } from 'rxjs';
import { getSystemErrorMap } from 'util';
import { CreateCharacterDto } from '../dtos/create_character';
import { Character } from '../models/character';
import { RULESETS } from '../data/rulesets';

// This service is responsible for data storage and retrieval
@Injectable()
export class CharacterService {
  private readonly characters: Array<Character> = [];

  create(characterDto: CreateCharacterDto) {
    // eslint-disable-next-line prefer-const
    let { ruleset, ...characterOptions } = characterDto;
    const newCharacter = {
      id: this.characters.length,
      ...characterOptions,
    };

console.log(RULESETS);
console.log(ruleset);
    if(!ruleset) { ruleset = 'DnD'; }
    RULESETS[ruleset].validateCharacter(newCharacter);

    this.characters.push(newCharacter);
    return this.characters[this.characters.length - 1];
  }

  findAll(): Array<Character> {
    return this.characters;
  }
}
