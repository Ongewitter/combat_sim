import { Controller, Get } from '@nestjs/common';
import { CombatService } from './combat.service';

@Controller('combat')
export class CombatController {
  constructor(private combatService: CombatService) {}

  @Get()
  async index(){
    return this.combatService.combat();
  }
}
