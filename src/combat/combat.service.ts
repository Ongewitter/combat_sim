import { Injectable } from '@nestjs/common';
import { CombatDto } from '../dtos/combat';
import { Character } from '../models/character';

// This service is responsible for data storage and retrieval
@Injectable()
export class CombatService {
  private readonly characters: Array<Character> = [];

  combat(combatDto: CombatDto) {
    const { ...characters } = combatDto;
    const results = [];

    for (const character in characters) {
      const target = this.findTarget(character);
      // eslint-disable-next-line prettier/prettier
      if (!target) { break; }

      this.attackTarget(character, target);
    }

    return results;
  }

  private findTarget(character){
    return this.characters.find((char) => {
      char.team != character.team && char.hp > 0;
    });
  }

  private attackTarget(attacker, target){
    const hit = this.rollToHit(attacker, target);
    if (hit) {
      this.dealDamage(attacker, target);
    }
  }

  private rollToHit(attacker, target){
    // TODO: depends on ruleset
    return attacker.toHit + this.getRoll(20) > target.armor;
  }

  private dealDamage(attacker, target){
    const damage = this.rollDamage(attacker.damage, attacker.bonus_damage);
    target.hp = target.hp - damage;
  }

  private rollDamage(damage, bonus_damage){
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
