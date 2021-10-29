import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CharactersController } from './characters/characters.controller';
import { CharacterService } from './characters/characters.service';
import { CombatController } from './combat/combat.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, CharactersController, CombatController],
  providers: [AppService, CatsService, CharacterService],
})
export class AppModule {}
