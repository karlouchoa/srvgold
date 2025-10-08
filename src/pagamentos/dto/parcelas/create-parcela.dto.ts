// src/pagamentos/dto/parcelas/create-parcela.dto.ts
import { IsNumber } from 'class-validator';

export class CreateParcelaDto {
  @IsNumber() id_forma: number;
  @IsNumber() ordem: number;
  @IsNumber() dias: number;
  @IsNumber() percentual: number;
  @IsNumber() acrescimo?: number;
}
