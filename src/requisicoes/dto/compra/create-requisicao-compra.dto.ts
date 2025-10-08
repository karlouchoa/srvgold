import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequisicaoCompraDto {
  @IsNumber() id_empresa: number;
  @IsNumber() id_usuario: number;

  @IsOptional() @IsString() prioridade?: string;
  @IsOptional() @IsString() observacao?: string;
}
