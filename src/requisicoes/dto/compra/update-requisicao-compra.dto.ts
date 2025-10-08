import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisicaoCompraDto } from './create-requisicao-compra.dto';
export class UpdateRequisicaoCompraDto extends PartialType(CreateRequisicaoCompraDto) {}
