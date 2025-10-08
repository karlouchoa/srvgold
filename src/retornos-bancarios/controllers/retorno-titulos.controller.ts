import { Controller, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RetornosBancariosService } from '../retornos-bancarios.service';
import { CreateTituloDto } from '../dto/create-titulo.dto';
import { UpdateTituloDto } from '../dto/update-titulo.dto';

@Controller('retorno-titulos')
export class RetornoTitulosController {
  constructor(private readonly service: RetornosBancariosService) {}

  @Post()
  create(@Body() dto: CreateTituloDto) {
    return this.service.createTitulo(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTituloDto) {
    return this.service.updateTitulo(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.removeTitulo(+id);
  }
}
