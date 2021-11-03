import {
  Controller,
  Post,
  Put,
  Body,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { UpdateCharacterDto } from '../dtos/update_character';
import { CharacterService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharacterService) {}

  @Get()
  async index() {
    return this.characterService.index();
  }

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Put(':id')
  // eslint-disable-next-line prettier/prettier
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  async remove(@Param('id') id: string) {
    return this.characterService.delete(id);
  }
}
