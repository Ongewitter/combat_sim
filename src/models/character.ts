import { Dice } from './dice';

export interface Character {
  id: number;
  name: string;
  hp: number;
  armor: string;
  toHit: string;
  damage: Dice;
  bonus_damage: Dice;
  team: string;
}
