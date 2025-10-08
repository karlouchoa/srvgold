// src/pagamentos/controllers/tipos-pagamento.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PagamentosService } from '../pagamentos.service';
import { CreateTipoDto } from '../dto/tipos/create-tipo.dto';
import { UpdateTipoDto } from '../dto/tipos/update-tipo.dto';
import { FilterTipoDto } from '../dto/tipos/filter-tipo.dto';

@Controller('tipos-pagamento')
export class TiposPagamentoController {
  constructor(private readonly service: PagamentosService) {}

  @Post() create(@Body() dto: CreateTipoDto) { return this.service.createTipo(dto); }
  @Get() findAll(@Query() q: FilterTipoDto) { return this.service.findTipos(q); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findTipo(+id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTipoDto) { return this.service.updateTipo(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeTipo(+id); }

  // aninhado: listar formas por tipo
  @Get(':id/formas')
  formasByTipo(@Param('id') id: string) { return this.service.findFormasByTipo(+id); }
}
