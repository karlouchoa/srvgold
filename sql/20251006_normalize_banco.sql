BEGIN;

CREATE TABLE IF NOT EXISTS public.banco_conta (
    id            bigserial PRIMARY KEY,
    banco_id      bigint NOT NULL UNIQUE REFERENCES public.banco(id) ON DELETE CASCADE,
    cnpj_conta    character varying(18),
    agencia       character varying(10),
    digito_agencia character varying(2),
    conta         character varying(20) NOT NULL,
    digito_conta  character varying(2),
    contabil      character varying(20),
    lote          integer,
    limite_banco  numeric(9,2),
    cbhost        integer DEFAULT 0
);

INSERT INTO public.banco_conta (
    banco_id, cnpj_conta, agencia, digito_agencia, conta, digito_conta, contabil, lote, limite_banco, cbhost
)
SELECT
    b.id,
    b.cnpj_conta,
    b.agencia,
    b.digito_agencia,
    b.conta,
    b.digito_conta,
    b.contabil,
    b.lote,
    b.limite_banco,
    b.cbhost
FROM public.banco b
WHERE NOT EXISTS (
    SELECT 1 FROM public.banco_conta bc WHERE bc.banco_id = b.id
);

CREATE TABLE IF NOT EXISTS public.banco_boleto_config (
    id                  bigserial PRIMARY KEY,
    banco_id            bigint NOT NULL UNIQUE REFERENCES public.banco(id) ON DELETE CASCADE,
    carteira            character varying(10),
    variacao_carteira   character varying(3),
    cedente             character varying(20),
    digito_cedente      character varying(2),
    contrato            character varying(20),
    emite_boleto_sn     boolean DEFAULT false,
    numero_boleto       integer DEFAULT 0,
    taxa_emissao        numeric(9,2),
    tipo_cobranca       character varying(60),
    layout_arquivo      character varying(30),
    codigo_transmissao  character varying(20)
);

INSERT INTO public.banco_boleto_config (
    banco_id, carteira, variacao_carteira, cedente, digito_cedente, contrato,
    emite_boleto_sn, numero_boleto, taxa_emissao, tipo_cobranca, layout_arquivo, codigo_transmissao
)
SELECT
    b.id,
    b.carteira,
    b.variacao_carteira,
    b.cedente,
    b.digito_cedente,
    b.contrato,
    COALESCE(b.emite_boleto_sn, false),
    COALESCE(b.numero_boleto, 0),
    b.taxa_emissao,
    b.tipo_cobranca,
    b.layout_arquivo,
    b.codigo_transmissao
FROM public.banco b
WHERE NOT EXISTS (
    SELECT 1 FROM public.banco_boleto_config bb WHERE bb.banco_id = b.id
);

CREATE TABLE IF NOT EXISTS public.banco_pix_config (
    id             bigserial PRIMARY KEY,
    banco_id       bigint NOT NULL UNIQUE REFERENCES public.banco(id) ON DELETE CASCADE,
    chave_pix      character varying(100),
    tipo_chave_pix character varying(15),
    psp            character varying(20),
    ambiente       character varying(20)
);

INSERT INTO public.banco_pix_config (
    banco_id, chave_pix, tipo_chave_pix, psp, ambiente
)
SELECT
    b.id,
    b.chave_pix,
    b.tipo_chave_pix,
    b.psp,
    b.ambiente
FROM public.banco b
WHERE NOT EXISTS (
    SELECT 1 FROM public.banco_pix_config bp WHERE bp.banco_id = b.id
);

CREATE TABLE IF NOT EXISTS public.banco_credenciais (
    id                  bigserial PRIMARY KEY,
    banco_id            bigint NOT NULL UNIQUE REFERENCES public.banco(id) ON DELETE CASCADE,
    caminho_certificado character varying(200),
    senha_certificado   character varying(60),
    client_id           character varying(100),
    client_secret       character varying(100)
);

INSERT INTO public.banco_credenciais (
    banco_id, caminho_certificado, senha_certificado, client_id, client_secret
)
SELECT
    b.id,
    b.caminho_certificado,
    b.senha_certificado,
    b.client_id,
    b.client_secret
FROM public.banco b
WHERE NOT EXISTS (
    SELECT 1 FROM public.banco_credenciais bc WHERE bc.banco_id = b.id
);

ALTER TABLE public.banco
    DROP COLUMN IF EXISTS cnpj_conta,
    DROP COLUMN IF EXISTS agencia,
    DROP COLUMN IF EXISTS digito_agencia,
    DROP COLUMN IF EXISTS conta,
    DROP COLUMN IF EXISTS digito_conta,
    DROP COLUMN IF EXISTS carteira,
    DROP COLUMN IF EXISTS variacao_carteira,
    DROP COLUMN IF EXISTS cedente,
    DROP COLUMN IF EXISTS digito_cedente,
    DROP COLUMN IF EXISTS contrato,
    DROP COLUMN IF EXISTS emite_boleto_sn,
    DROP COLUMN IF EXISTS numero_boleto,
    DROP COLUMN IF EXISTS taxa_emissao,
    DROP COLUMN IF EXISTS tipo_cobranca,
    DROP COLUMN IF EXISTS layout_arquivo,
    DROP COLUMN IF EXISTS codigo_transmissao,
    DROP COLUMN IF EXISTS lote,
    DROP COLUMN IF EXISTS limite_banco,
    DROP COLUMN IF EXISTS chave_pix,
    DROP COLUMN IF EXISTS tipo_chave_pix,
    DROP COLUMN IF EXISTS psp,
    DROP COLUMN IF EXISTS ambiente,
    DROP COLUMN IF EXISTS caminho_certificado,
    DROP COLUMN IF EXISTS senha_certificado,
    DROP COLUMN IF EXISTS client_id,
    DROP COLUMN IF EXISTS client_secret,
    DROP COLUMN IF EXISTS contabil,
    DROP COLUMN IF EXISTS cbhost;

COMMIT;
