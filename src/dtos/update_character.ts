import { Dice } from '../models/dice';

export class UpdateCharacterDto {
  _id: number;
  name: string;
  hp: number;
  armor: string;
  toHit: string;
  damage: Dice;
  bonusDamage: Dice;
  team: string;
  ruleset: string;
}
