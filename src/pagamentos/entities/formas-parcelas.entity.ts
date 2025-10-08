// src/pagamentos/entities/formas-parcelas.entity.ts
export class FormasPagamentoParcelas {
  id_parcela: bigint;
  id_forma: bigint;
  ordem: number;
  dias: number;
  percentual: number;
  acrescimo?: number;
}
