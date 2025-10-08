// src/pagamentos/dto/formas/create-forma.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateParcelaDto } from '../parcelas/create-parcela.dto';

export class CreateFormaDto {
  @IsString() descricao: string;
  @IsNumber() id_tipo: number;
  @IsOptional() @IsBoolean() ativo?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateParcelaDto)
  parcelas?: CreateParcelaDto[];
}
