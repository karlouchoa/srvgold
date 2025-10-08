import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisicaoItemDto } from './create-requisicao-item.dto';
export class UpdateRequisicaoItemDto extends PartialType(CreateRequisicaoItemDto) {}
