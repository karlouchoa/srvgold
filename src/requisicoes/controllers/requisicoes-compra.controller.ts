import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RequisicoesService } from '../requisicoes.service';
import { CreateRequisicaoCompraDto } from '../dto/compra/create-requisicao-compra.dto';
import { UpdateRequisicaoCompraDto } from '../dto/compra/update-requisicao-compra.dto';

@Controller('requisicoes-compra')
export class RequisicoesCompraController {
  constructor(private readonly service: RequisicoesService) {}

  @Post()
  create(@Body() dto: CreateRequisicaoCompraDto) {
    return this.service.createRequisicaoCompra(dto);
  }

  @Get(':id_empresa')
  findAll(@Param('id_empresa') id_empresa: string) {
    return this.service.findAllRequisicoesCompra(+id_empresa);
  }

  @Get('detalhe/:id')
  findOne(@Param('id') id: string) {
    return this.service.findRequisicaoCompra(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequisicaoCompraDto) {
    return this.service.updateRequisicaoCompra(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.deleteRequisicaoCompra(+id);
  }
}
