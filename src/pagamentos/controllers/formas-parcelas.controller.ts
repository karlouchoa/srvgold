// src/pagamentos/controllers/formas-parcelas.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PagamentosService } from '../pagamentos.service';
import { CreateParcelaDto } from '../dto/parcelas/create-parcela.dto';
import { UpdateParcelaDto } from '../dto/parcelas/update-parcela.dto';
import { FilterParcelaDto } from '../dto/parcelas/filter-parcela.dto';

@Controller('formas-parcelas')
export class FormasParcelasController {
  constructor(private readonly service: PagamentosService) {}

  @Post() create(@Body() dto: CreateParcelaDto) { return this.service.createParcela(dto); }
  @Get() findAll(@Query() q: FilterParcelaDto) { return this.service.findParcelas(q); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateParcelaDto) { return this.service.updateParcela(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeParcela(+id); }
}
