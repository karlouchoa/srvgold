import { Controller, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RequisicoesService } from '../requisicoes.service';
import { CreateRequisicaoItemDto } from '../dto/itens/create-requisicao-item.dto';
import { UpdateRequisicaoItemDto } from '../dto/itens/update-requisicao-item.dto';

@Controller('requisicao-itens')
export class RequisicaoItensController {
  constructor(private readonly service: RequisicoesService) {}

  @Post()
  create(@Body() dto: CreateRequisicaoItemDto) {
    return this.service.createRequisicaoItem(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequisicaoItemDto) {
    return this.service.updateRequisicaoItem(+id, dto);
  }

  @Patch(':id/status/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.service.updateStatusItem(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.deleteRequisicaoItem(+id);
  }
}
