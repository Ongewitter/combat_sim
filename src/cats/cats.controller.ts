import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return `This action returns the request: ${request}`;
  }

  @Post()
  create(): string {
    return 'This action adds a new cat to the bag';
  }
}
