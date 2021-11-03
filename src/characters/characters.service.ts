import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { UpdateCharacterDto } from '../dtos/update_character';
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
      // eslint-disable-next-line prettier/prettier
      if (err) { return console.log(err); }

      // Storing a reference to the database so you can use it later
      const db = client.db(CONSTANTS.DB_NAME);
      this.charactersCollection = db.collection('characters');
    });
  }

  index() {
    return this.charactersCollection.find().toArray();
  }

  create(characterDto: CreateCharacterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ruleset, ...newCharacter } = characterDto;
    // TODO Implement ruleset validation
    // if(!ruleset) { ruleset = 'DnD'; }
    // RULESETS[ruleset].validateCharacter(newCharacter);
    return this.charactersCollection
      .insertOne(newCharacter)
      .then(async (response) => {
        return await this.charactersCollection.findOne({
          _id: response.insertedId,
        });
      })
      .catch((error) => console.error(error));
  }

  update(_id: string, updateCharacter: UpdateCharacterDto) {
    return this.charactersCollection
      .updateOne({ _id: _id }, { $set: updateCharacter })
      .then(async () => {
        return await this.charactersCollection.findOne({ _id: _id });
      })
      .catch((error) => console.error(error));
  }

  delete(_id: string) {
    this.charactersCollection.deleteOne({ _id: _id });
    return null;
  }
}
