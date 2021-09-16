import { Controller, Post, Body } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create_character';
import { CharacterService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharacterService) {}

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<CreateCharacterDto> {
    return this.charactersService.create(createCharacterDto);
  }
}
