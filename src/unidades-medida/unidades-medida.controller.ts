import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { UnidadesMedidaService } from './unidades-medida.service';
import { CreateUnidadesMedidaDto } from './dto/create-unidades-medida.dto';
import { UpdateUnidadesMedidaDto } from './dto/update-unidades-medida.dto';
import { FilterUnidadesMedidaDto } from './dto/filter-unidades-medida.dto';

@Controller('unidades-medida')
export class UnidadesMedidaController {
  constructor(private readonly service: UnidadesMedidaService) {}

  @Post()
  create(@Body() dto: CreateUnidadesMedidaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterUnidadesMedidaDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUnidadesMedidaDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
