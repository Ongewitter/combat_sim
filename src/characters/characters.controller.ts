import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { CharacterService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharacterService) {}

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Delete()
  // eslint-disable-next-line prettier/prettier
  async remove(@Param('id') id: string) {
    return this.characterService.delete(id);
  }
}

// return (<TableRow key={result.id}>
//   <td>{result.status}</td>
//   <td>{result.name}</td>
//   <td>{result.hp}</td>
//   <td>{result.damage_dealt}</td>
//   <td>{result.damage_taken}</td>
