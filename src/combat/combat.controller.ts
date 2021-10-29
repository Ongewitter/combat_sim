import { Controller } from '@nestjs/common';

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
}
