import { Controller, Get } from '@nestjs/common';
import { CombatService } from './combat.service';

@Controller('combat')
export class CombatController {
  constructor(private combatService: CombatService) {}

  // TODO: Need to return this:
  // return (<TableRow key={result.id}>
  //   <td>{result.status}</td>
  //   <td>{result.name}</td>
  //   <td>{result.hp}</td>
  //   <td>{result.damage_dealt}</td>
  //   <td>{result.damage_taken}</td>
  @Get()
  async index(){
    return this.combatService.combat();
  }
}
