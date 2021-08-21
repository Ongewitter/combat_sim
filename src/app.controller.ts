import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('combat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello() {
  //   return {
  //     hello: this.appService.getHello(),
  //     message: 'message',
  //   };
  // }

  @Get()
  findAll() {
    return { fun: 'this.catsService.findAll()' };
  }
}
