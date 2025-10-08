import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequisicaoEstoqueDto {
  @IsNumber() id_empresa: number;
  @IsNumber() id_ordem: number;

  @IsOptional() @IsString() numero?: string;
  @IsOptional() @IsString() observacoes?: string;
}
