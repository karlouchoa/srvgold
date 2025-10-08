import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculosDto } from './dto/create-veiculos.dto';
import { UpdateVeiculosDto } from './dto/update-veiculos.dto';
import { FilterVeiculosDto } from './dto/filter-veiculos.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly service: VeiculosService) {}

  @Post()
  create(@Body() dto: CreateVeiculosDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterVeiculosDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVeiculosDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
