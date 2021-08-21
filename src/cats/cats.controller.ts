import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns the ${id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    this.catsService.create(createCatDto);
    return `This action adds a new cat to the bag with DTO: ${createCatDto}`;
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates the #${id} cat with DTO: ${updateCatDto}`;
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes the #${id} cat`;
  }
}
