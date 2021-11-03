import { Dice } from '../models/dice';

export class CreateCharacterDto {
  name: string;
  hp: number;
  armor: string;
  toHit: string;
  damage: Dice;
  bonus_damage: Dice;
  team: string;
  ruleset: string;
}
