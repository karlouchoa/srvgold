import {
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CaixaDocumentosDto } from './caixa-documentos.dto';
import { CaixaPagamentosDto } from './caixa-pagamentos.dto';

export class CreateCaixaAberturasDto {
  @IsNumber()
  id_empresa: number;

  @IsNumber()
  id_usuario: number;

  @IsOptional()
  @IsNumber()
  saldo_inicial?: number;

  @IsOptional()
  @IsString()
  ip_abertura?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  data_fechamento?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CaixaDocumentosDto)
  caixa_documentos?: CaixaDocumentosDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CaixaPagamentosDto)
  caixa_pagamentos?: CaixaPagamentosDto[];
}
