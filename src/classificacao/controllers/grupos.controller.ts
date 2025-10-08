import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClassificacaoService } from '../classificacao.service';
import { CreateGrupoDto } from '../dto/grupos/create-grupo.dto';
import { UpdateGrupoDto } from '../dto/grupos/update-grupo.dto';

@Controller('grupos')
export class GruposController {
  constructor(private readonly service: ClassificacaoService) {}

  @Post() create(@Body() dto: CreateGrupoDto) { return this.service.createGrupo(dto); }
  @Get() findAll() { return this.service.findAllGrupos(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findGrupo(+id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateGrupoDto) { return this.service.updateGrupo(+id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.removeGrupo(+id); }

  @Get(':id/subgrupos')
  findSubgruposByGrupo(@Param('id') id: string) {
    return this.service.findSubgruposByGrupo(+id);
  }
}
