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

  async combat() {
    await this.charactersCollection
      .find()
      .toArray()
      .then((result) => {
        this.characters = result;
      })
      .catch((error) => console.error(error));

    const combatResults = this.populateResults(this.characters);

    do {
      for (const character of combatResults) {
        console.log('------FIGHT------');
        const target = this.findTarget(combatResults, character);
        console.log(character);
        console.log(target);
        // eslint-disable-next-line prettier/prettier
        if (!target) { break; }

        this.attackTarget(character, target);
      }
    } while (this.keepFighting(combatResults));

    return combatResults;
  }

  private populateResults(characters: Array<Character>) {
    const acc: Array<CombatResult> = [];
    characters.forEach((character) => {
      acc.push({
        status: 'Alive',
        damageDealt: 0,
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
      return char.team !== character.team && char.hp > 0;
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

  private dealDamage(attacker: CombatResult, target: CombatResult) {
    const damage = this.rollDamage(attacker.damage) + this.rollDamage(attacker.bonusDamage);
    attacker.damageDealt += damage;
    target.hp -= damage;
    if (target.hp <= 0) {
      target.status = 'Dead';
    }
  }

  private rollDamage(damage: Dice) {
    // TODO: should depend on ruleset
    let total = 0;
    for (let i = 0; i < damage.amount; i++) {
      total += this.getRoll(damage.die);
    }
    return total;
  }

  private getRoll(die: number) {
    return Math.floor(Math.random() * (die - 1)) + 1;
  }

  private keepFighting(combatResults) {
    const totals = {};
    combatResults.forEach((char) => {
      if (totals[char.team]) {
        totals[char.team] += char.hp;
      } else {
        totals[char.team] = char.hp;
      }
    });
    return (
      combatResults.length > 0 &&
      Object.values(totals).every((total) => total > 0)
    );
  }
}
