import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('combat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return { fun: 'this.catsService.findAll()' };
  }
}
