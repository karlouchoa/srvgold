import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaixaAberturasService } from './caixa-aberturas.service';
import { CreateCaixaAberturasDto } from './dto/create-caixa-aberturas.dto';
import { UpdateCaixaAberturasDto } from './dto/update-caixa-aberturas.dto';

@Controller('caixa-aberturas')
export class CaixaAberturasController {
  constructor(private readonly caixaAberturasService: CaixaAberturasService) {}

  @Post()
  create(@Body() dto: CreateCaixaAberturasDto) {
    return this.caixaAberturasService.create(dto);
  }

  @Get()
  findAll() {
    return this.caixaAberturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caixaAberturasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCaixaAberturasDto) {
    return this.caixaAberturasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caixaAberturasService.remove(+id);
  }
}
