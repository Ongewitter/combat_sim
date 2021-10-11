import { Dice } from '../models/dice';

export class CreateCharacterDto {
  name: string;
  hp: number;
  ac: string;
  tohit: string;
  damage: Dice;
  bonus_damage: Dice;
  ruleset: string;
}
