import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItensBomDto } from './itens-bom.dto';
import { FotosItensDto } from './fotos-itens.dto';

export class CreateItensDto {
  @IsNumber()
  id_empresa: number;

  @IsOptional()
  @IsNumber()
  id_fornecedor?: number;

  @IsOptional()
  @IsNumber()
  id_grupo?: number;

  @IsOptional()
  @IsNumber()
  id_subgrupo?: number;

  @IsOptional()
  @IsNumber()
  id_familia?: number;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  descricao_fat?: string;

  @IsString()
  unidade_venda: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsNumber()
  qtde_embalagem?: number;

  @IsOptional()
  @IsNumber()
  peso_bruto?: number;

  @IsOptional()
  @IsNumber()
  peso_liquido?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsBoolean()
  permite_negativo?: boolean;

  @IsOptional()
  @IsBoolean()
  aceita_desconto?: boolean;

  @IsOptional()
  @IsBoolean()
  servico?: boolean;

  @IsOptional()
  @IsString()
  usuario_cadastro?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FotosItensDto)
  fotos_itens?: FotosItensDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItensBomDto)
  itens_bom?: ItensBomDto[];
}
