import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Controller('bancos')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post()
  create(@Body() dto: CreateBancoDto) {
    return this.bancoService.create(dto);
  }

  @Get()
  findAll() {
    return this.bancoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bancoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBancoDto) {
    return this.bancoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bancoService.remove(+id);
  }
}
