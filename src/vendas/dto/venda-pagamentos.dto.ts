import { IsNumber, IsOptional, IsDateString } from 'class-validator';

export class VendaPagamentosDto {
  @IsOptional() @IsNumber() id_pagamento?: number;
  @IsNumber() id_tipo_pagamento: number;
  @IsOptional() @IsNumber() id_formas_pagamento?: number;
  @IsNumber() valor: number;
  @IsOptional() @IsNumber() taxa_adm?: number;
  @IsOptional() @IsDateString() data_recebimento?: Date;
}
