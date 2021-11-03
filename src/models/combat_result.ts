import { Character } from '../models/character';

export interface CombatResult extends Character {
  status: string,
  damageDealt: number,
  hits: number,
  attacks: number,
}
