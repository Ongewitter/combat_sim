import { Injectable } from '@nestjs/common';
import { Character } from '../models/character';
import { Dice } from '../models/dice';
import { CombatResult } from '../models/combat_result';
import { MongoClient } from 'mongodb';
import { CONSTANTS } from '../constants';

// This service is responsible for data storage and retrieval
@Injectable()
export class CombatService {
  private charactersCollection = null;
  private characters: Array<Character> = [];

  constructor(){
    MongoClient.connect(CONSTANTS.DB_URL, {}, (err, client) => {
      if (err) {
        return console.log(err);
      }

      // Storing a reference to the database so you can use it later
      const db = client.db(CONSTANTS.DB_NAME);
      this.charactersCollection = db.collection('characters');
    });
  }

  combat() {
    this.charactersCollection
      .find()
      .toArray()
      .then((result) => {
        this.characters = result;
      })
      .catch((error) => console.error(error));

    const combatResults = this.populateResults(this.characters);

    for (const character of combatResults) {
      const target = this.findTarget(combatResults, character);
      // eslint-disable-next-line prettier/prettier
      if (!target) { break; }

      this.attackTarget(character, target);
    }

    return combatResults;
  }

  private populateResults(characters: Array<Character>) {
    const acc: Array<CombatResult> = [];
    characters.forEach((character) => {
      acc.push({
        status: 'Alive',
        damage_dealt: 0,
        hits: 0,
        attacks: 0,
        ...character,
      });
    });
    return acc;
  }

  // eslint-disable-next-line prettier/prettier
  private findTarget(combatResults: Array<CombatResult>, character: CombatResult){
    return combatResults.find((char) => {
      char.team != character.team && char.hp > 0;
    });
  }

  private attackTarget(attacker: CombatResult, target: CombatResult){
    attacker.attacks++;
    const hit = this.rollToHit(attacker, target);
    if (hit) {
      attacker.hits++;
      this.dealDamage(attacker, target);
    }
  }

  private rollToHit(attacker: CombatResult, target: CombatResult) {
    // TODO: depends on ruleset
    return attacker.toHit + this.getRoll(20) > target.armor;
  }

  private dealDamage(attacker: CombatResult, target: CombatResult){
    const damage = this.rollDamage(attacker.damage, attacker.bonus_damage);
    attacker.damage_dealt += damage;
    target.hp -= damage;
  }

  private rollDamage(damage: Dice, bonus_damage: Dice){
    // TODO: depends on ruleset
    let total = 0;
    for (let i = 0; i < damage.amount; i++){
      total += this.getRoll(damage.die);
    }
    for (let i = 0; i < bonus_damage.amount; i++){
      total += this.getRoll(bonus_damage.die);
    }
    return total;
  }

  private getRoll(die: number){
    return Math.floor(Math.random() * (die - 1)) + 1;
  }
}
