// src/pagamentos/controllers/formas-pagamento.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PagamentosService } from '../pagamentos.service';
import { CreateFormaDto } from '../dto/formas/create-forma.dto';
import { UpdateFormaDto } from '../dto/formas/update-forma.dto';
import { FilterFormaDto } from '../dto/formas/filter-forma.dto';

@Controller('formas-pagamento')
export class FormasPagamentoController {
  constructor(private readonly service: PagamentosService) {}

  @Post() create(@Body() dto: CreateFormaDto) { return this.service.createForma(dto); }
  @Get() findAll(@Query() q: FilterFormaDto) { return this.service.findFormas(q); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findForma(+id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateFormaDto) { return this.service.updateForma(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeForma(+id); }

  // aninhado: parcelas por forma
  @Get(':id/parcelas')
  parcelasByForma(@Param('id') id: string) { return this.service.findParcelasByForma(+id); }
}
