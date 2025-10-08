import { Controller, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClassificacaoService } from '../classificacao.service';
import { CreateFamiliaDto } from '../dto/familias/create-familia.dto';
import { UpdateFamiliaDto } from '../dto/familias/update-familia.dto';

@Controller('familias')
export class FamiliasController {
  constructor(private readonly service: ClassificacaoService) {}

  @Post() create(@Body() dto: CreateFamiliaDto) { return this.service.createFamilia(dto); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateFamiliaDto) { return this.service.updateFamilia(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeFamilia(+id); }
}
