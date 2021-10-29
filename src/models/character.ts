import { Dice } from './dice';

export interface Character {
  id: number;
  name: string;
  hp: number;
  ac: string;
  tohit: string;
  damage: Dice;
  bonus_damage: Dice;
  team: string;
}
