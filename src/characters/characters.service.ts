import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { Character } from '../models/character';

// This service is responsible for data storage and retrieval
@Injectable()
export class CharacterService {
  private readonly characters: Array<Character> = [];

  create(characterDto: CreateCharacterDto): Character {
    const newCharacter = {
      id: this.characters.length,
      ...characterDto,
    };

    this.characters.push(newCharacter);
    return this.characters[this.characters.length - 1];
  }

  findAll(): Array<Character> {
    return this.characters;
  }
}
