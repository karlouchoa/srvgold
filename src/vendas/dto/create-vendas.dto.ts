import { IsNumber, IsOptional, IsString, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendaItensDto } from './venda-itens.dto';
import { VendaPagamentosDto } from './venda-pagamentos.dto';
import { VendaStatusDto } from './venda-status.dto';

export class CreateVendasDto {
  @IsNumber() id_empresa: number;
  @IsNumber() numero: number;
  @IsNumber() id_cliente: number;

  @IsOptional() @IsNumber() id_vendedor?: number;

  @IsDateString() data_emissao: Date;

  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() observacoes?: string;

  @IsOptional() @IsNumber() desconto_perc?: number;
  @IsOptional() @IsNumber() desconto_valor?: number;
  @IsOptional() @IsNumber() total_produtos?: number;
  @IsOptional() @IsNumber() total_venda?: number;
  @IsOptional() @IsNumber() total_nf?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaItensDto)
  venda_itens?: VendaItensDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaPagamentosDto)
  venda_pagamentos?: VendaPagamentosDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaStatusDto)
  venda_status?: VendaStatusDto[];
}
