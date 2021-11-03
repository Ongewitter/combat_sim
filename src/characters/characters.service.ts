import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { Character } from '../models/character';
import { RULESETS } from '../data/rulesets';
import { MongoClient } from 'mongodb';
import { CONSTANTS } from '../constants';

// This service is responsible for data storage and retrieval
@Injectable()
export class CharacterService {
  private characters: Array<Character> = [];
  private charactersCollection = null;

  constructor() {
    MongoClient.connect(CONSTANTS.DB_URL, {}, (err, client) => {
      if (err) {
        return console.log(err);
      }

      // Storing a reference to the database so you can use it later
      const db = client.db(CONSTANTS.DB_NAME);
      this.charactersCollection = db.collection('characters');
    });
  }

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
    this.charactersCollection
      .insertOne(newCharacter)
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
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
