import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisicaoEstoqueDto } from './create-requisicao-estoque.dto';
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateRequisicaoEstoqueDto extends PartialType(CreateRequisicaoEstoqueDto) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;

  @IsOptional()
  @IsNumber()
  id_ordem?: number;
}
