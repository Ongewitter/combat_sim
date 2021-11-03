import { Character } from '../models/character';

export interface CombatResult extends Character {
  status: string,
  damage_dealt: number,
  hits: number,
  attacks: number,
}
