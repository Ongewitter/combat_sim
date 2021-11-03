import { Dice } from './dice';

export interface Character {
  id: number;
  name: string;
  hp: number;
  armor: string;
  toHit: string;
  damage: Dice;
  bonusDamage: Dice;
  team: string;
}
