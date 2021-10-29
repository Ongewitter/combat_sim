import { Controller } from '@nestjs/common';

@Controller('combat')
export class CombatController {
  constructor(private combatService: CombatService) {}
}
