import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendasDto } from './dto/create-vendas.dto';
import { UpdateVendasDto } from './dto/update-vendas.dto';
import { FilterVendasDto } from './dto/filter-vendas.dto';

@Controller('vendas')
export class VendasController {
  constructor(private readonly service: VendasService) {}

  @Post()
  create(@Body() dto: CreateVendasDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterVendasDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVendasDto) {
    return this.service.update(+id, dto);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string, @Body('usuario') usuario: string) {
    return this.service.cancel(+id, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
