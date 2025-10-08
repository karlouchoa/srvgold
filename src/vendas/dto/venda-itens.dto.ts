import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendaItensEstoqueDto } from './venda-itens-estoque.dto';
import { VendaItensStatusDto } from './venda-itens-status.dto';
import { VendaItensTributosDto } from './venda-itens-tributos.dto';

export class VendaItensDto {
  @IsOptional() @IsNumber() id_item_venda?: number;
  @IsNumber() id_item: number;
  @IsNumber() quantidade: number;
  @IsNumber() preco_unitario: number;

  @IsOptional() @IsNumber() desconto_perc?: number;
  @IsOptional() @IsNumber() desconto_valor?: number;
  @IsNumber() total_item: number;
  @IsOptional() @IsNumber() custo_item?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaItensEstoqueDto)
  venda_itens_estoque?: VendaItensEstoqueDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaItensStatusDto)
  venda_itens_status?: VendaItensStatusDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendaItensTributosDto)
  venda_itens_tributos?: VendaItensTributosDto[];
}
