import { IsString, IsOptional, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VendedoresComissaoDto } from './vendedores-comissao.dto';
import { VendedoresCredenciaisDto } from './vendedores-credenciais.dto';
import { VendedoresMetasDto } from './vendedores-metas.dto';

export class CreateVendedoresDto {
  @IsNumber()
  id_empresa: number;

  @IsString()
  nome: string;

  @IsOptional() @IsString() cpf?: string;
  @IsOptional() @IsString() setor?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() ramal?: string;
  @IsOptional() @IsString() ddd?: string;
  @IsOptional() @IsBoolean() ativo?: boolean;
  @IsOptional() @IsBoolean() todos_clientes?: boolean;
  @IsOptional() @IsBoolean() nao_soma_faturamento?: boolean;
  @IsOptional() @IsString() imagem_perfil?: string;
  @IsOptional() @IsString() tipo?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendedoresComissaoDto)
  vendedores_comissao?: VendedoresComissaoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendedoresCredenciaisDto)
  vendedores_credenciais?: VendedoresCredenciaisDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VendedoresMetasDto)
  vendedores_metas?: VendedoresMetasDto[];
}
