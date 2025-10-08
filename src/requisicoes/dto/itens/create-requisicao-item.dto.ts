import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequisicaoItemDto {
  @IsNumber() id_requisicao: number;
  @IsNumber() id_item: number;
  @IsNumber() quantidade: number;

  @IsOptional() @IsString() unidade?: string;
  @IsOptional() @IsString() observacao?: string;
}
