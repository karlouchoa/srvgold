import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequisicaoEstoqueItemDto {
  @IsNumber() id_req: number;
  @IsNumber() id_item: number;
  @IsNumber() quantidade: number;

  @IsOptional() @IsString() unidade?: string;
  @IsOptional() @IsNumber() custo_unit?: number;
  @IsOptional() @IsNumber() custo_total?: number;
}
