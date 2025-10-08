import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto } from './dto/create-usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import { FilterUsuariosDto } from './dto/filter-usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  create(@Body() dto: CreateUsuariosDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterUsuariosDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUsuariosDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
