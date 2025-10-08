export class VendaPagamentos {
  id_pagamento: bigint;
  id_venda: bigint;
  id_tipo_pagamento: bigint;
  id_formas_pagamento?: bigint;
  valor: number;
  taxa_adm?: number;
  data_recebimento?: Date;
}
