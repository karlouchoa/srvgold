import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RequisicoesService } from '../requisicoes.service';
import { CreateRequisicaoEstoqueDto } from '../dto/estoque/create-requisicao-estoque.dto';
import { UpdateRequisicaoEstoqueDto } from '../dto/estoque/update-requisicao-estoque.dto';
import { CreateRequisicaoEstoqueItemDto } from '../dto/estoque/create-requisicao-estoque-item.dto';

@Controller('requisicoes-estoque')
export class RequisicoesEstoqueController {
  constructor(private readonly service: RequisicoesService) {}

  @Post()
  create(@Body() dto: CreateRequisicaoEstoqueDto) {
    return this.service.createRequisicaoEstoque(dto);
  }

  @Get(':id_empresa')
  findAll(@Param('id_empresa') id_empresa: string) {
    return this.service.findAllRequisicoesEstoque(+id_empresa);
  }

  @Get('detalhe/:id_req')
  findOne(@Param('id_req') id_req: string) {
    return this.service.findRequisicaoEstoque(+id_req);
  }

  @Patch(':id_req')
  update(@Param('id_req') id_req: string, @Body() dto: UpdateRequisicaoEstoqueDto) {
    return this.service.updateRequisicaoEstoque(+id_req, dto);
  }

  @Delete(':id_req')
  remove(@Param('id_req') id_req: string) {
    return this.service.deleteRequisicaoEstoque(+id_req);
  }

  @Post(':id_req/itens')
  addItem(@Param('id_req') id_req: string, @Body() dto: CreateRequisicaoEstoqueItemDto) {
    return this.service.createRequisicaoEstoqueItem({ ...dto, id_req: +id_req });
  }
}
