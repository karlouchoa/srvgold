import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { RetornosBancariosService } from '../retornos-bancarios.service';
import { CreateRetornoDto } from '../dto/create-retorno.dto';
import { UpdateRetornoDto } from '../dto/update-retorno.dto';
import { FilterRetornoDto } from '../dto/filter-retorno.dto';

@Controller('retornos-bancarios')
export class RetornosBancariosController {
  constructor(private readonly service: RetornosBancariosService) {}

  @Post()
  create(@Body() dto: CreateRetornoDto) {
    return this.service.createRetorno(dto);
  }

  @Get()
  findAll(@Query() filters: FilterRetornoDto) {
    return this.service.findAllRetornos(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findRetorno(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRetornoDto) {
    return this.service.updateRetorno(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.removeRetorno(+id);
  }

  @Get(':id/titulos')
  findTitulosByRetorno(@Param('id') id: string) {
    return this.service.findTitulosByRetorno(+id);
  }
}
