import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { CharacterService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharacterService) {}

  @Get()
  async index(){
    return this.characterService.index();
  }

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  async remove(@Param('id') id: string) {
    console.log(id)
    return this.characterService.delete(id);
  }
}
