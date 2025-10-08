import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ItensService } from './itens.service';
import { CreateItensDto } from './dto/create-itens.dto';
import { UpdateItensDto } from './dto/update-itens.dto';
import { FilterItensDto } from './dto/filter-itens.dto';
import { TributacaoItensDto } from './dto/tributacao-itens.dto';
import { FilterSaldoDto } from './dto/saldos/filter-saldo.dto';
import { CreateSaldoDto } from './dto/saldos/create-saldo.dto';
import { UpdateSaldoDto } from './dto/saldos/update-saldo.dto';

@Controller('itens')
export class ItensController {
  constructor(private readonly service: ItensService) {}

  @Post()
  create(@Body() dto: CreateItensDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterItensDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItensDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

@Post(':id_item/tributacao')
addTributacao(@Param('id_item') id_item: string, @Body() dto: TributacaoItensDto) {
  return this.service.addTributacao({ ...dto, id_item: +id_item });
}

@Get(':id_item/tributacao')
findTributacoesByItem(@Param('id_item') id_item: string) {
  return this.service.findTributacoesByItem(+id_item);
}

@Patch('tributacao/:id_tributacao')
updateTributacao(
  @Param('id_tributacao') id_tributacao: string,
  @Body() dto: TributacaoItensDto,
) {
  return this.service.updateTributacao(+id_tributacao, dto);
}

@Delete('tributacao/:id_tributacao')
removeTributacao(@Param('id_tributacao') id_tributacao: string) {
  return this.service.removeTributacao(+id_tributacao);
}

@Post(':id_item/saldos')
addSaldo(@Param('id_item') id_item: string, @Body() dto: CreateSaldoDto) {
  return this.service.addSaldo({ ...dto, id_item: +id_item });
}

@Get(':id_item/saldos')
findSaldoByItem(@Param('id_item') id_item: string) {
  return this.service.findSaldoByItem(+id_item);
}

@Get('saldos/listar')
findSaldos(@Query() filters: FilterSaldoDto) {
  return this.service.findSaldos(filters);
}

@Patch('saldos/:id_saldo')
updateSaldo(@Param('id_saldo') id_saldo: string, @Body() dto: UpdateSaldoDto) {
  return this.service.updateSaldo(+id_saldo, dto);
}

@Delete('saldos/:id_saldo')
removeSaldo(@Param('id_saldo') id_saldo: string) {
  return this.service.removeSaldo(+id_saldo);
}

}
