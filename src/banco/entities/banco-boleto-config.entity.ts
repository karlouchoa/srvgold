export class BancoBoletoConfig {
  id: bigint;
  banco_id: bigint;
  carteira?: string;
  variacao_carteira?: string;
  cedente?: string;
  digito_cedente?: string;
  contrato?: string;
  emite_boleto_sn?: boolean;
  numero_boleto?: number;
  taxa_emissao?: number;
  tipo_cobranca?: string;
  layout_arquivo?: string;
  codigo_transmissao?: string;
}
