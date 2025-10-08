import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { CaixaAberturasService } from './caixa-aberturas.service';
import { CreateCaixaAberturasDto } from './dto/create-caixa-aberturas.dto';
import { UpdateCaixaAberturasDto } from './dto/update-caixa-aberturas.dto';

@Controller('caixa-aberturas')
export class CaixaAberturasController {
  constructor(private readonly service: CaixaAberturasService) {}

  @Post()
  create(@Body() dto: CreateCaixaAberturasDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCaixaAberturasDto) {
    return this.service.update(+id, dto);
  }

  @Patch(':id/fechar')
  close(@Param('id') id: string, @Body('saldo_final') saldo_final: number) {
    return this.service.close(+id, saldo_final);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
