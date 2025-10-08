import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { CreateVendedoresDto } from './dto/create-vendedores.dto';
import { UpdateVendedoresDto } from './dto/update-vendedores.dto';
import { FilterVendedoresDto } from './dto/filter-vendedores.dto';

@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly service: VendedoresService) {}

  @Post()
  create(@Body() dto: CreateVendedoresDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterVendedoresDto) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVendedoresDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
