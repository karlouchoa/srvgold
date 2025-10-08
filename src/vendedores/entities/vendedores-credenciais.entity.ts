export class VendedoresCredenciais {
  id_credencial: bigint;
  id_vendedor: bigint;
  senha?: string;
  usuario_vpn?: string;
  senha_vpn?: string;
  ultimo_login?: Date;
}
