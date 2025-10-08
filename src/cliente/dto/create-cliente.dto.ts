export class CreateClienteDto {}
import { IsString, IsOptional, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ClienteAssociadoDto } from './cliente-associado.dto';
import { ClienteDependenteDto } from './cliente-dependente.dto';
import { ClienteEnderecoDto } from './cliente-endereco.dto';
import { ClienteReferenciaDto } from './cliente-referencia.dto';
import { ClienteSocioDto } from './cliente-socio.dto';

export class CreateClienteDto {
  @IsNumber()
  id_empresa: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsString()
  nome_razao: string;

  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsOptional()
  @IsString()
  cpf_cnpj?: string;

  @IsOptional()
  @IsString()
  inscricao_estadual?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsBoolean()
  ativo_sn?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClienteAssociadoDto)
  cliente_associado?: ClienteAssociadoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClienteDependenteDto)
  cliente_dependente?: ClienteDependenteDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClienteEnderecoDto)
  cliente_endereco?: ClienteEnderecoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClienteReferenciaDto)
  cliente_referencia?: ClienteReferenciaDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClienteSocioDto)
  cliente_socio?: ClienteSocioDto[];
}
