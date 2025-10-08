import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClassificacaoService } from '../classificacao.service';
import { CreateSubgrupoDto } from '../dto/subgrupos/create-subgrupo.dto';
import { UpdateSubgrupoDto } from '../dto/subgrupos/update-subgrupo.dto';

@Controller('subgrupos')
export class SubgruposController {
  constructor(private readonly service: ClassificacaoService) {}

  @Post() create(@Body() dto: CreateSubgrupoDto) { return this.service.createSubgrupo(dto); }
  @Get(':id/familias')
  findFamiliasBySubgrupo(@Param('id') id: string) { return this.service.findFamiliasBySubgrupo(+id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateSubgrupoDto) { return this.service.updateSubgrupo(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeSubgrupo(+id); }
}
