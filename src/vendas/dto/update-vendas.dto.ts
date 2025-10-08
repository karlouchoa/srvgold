import { PartialType } from '@nestjs/mapped-types';
import { CreateVendasDto } from './create-vendas.dto';

export class UpdateVendasDto extends PartialType(CreateVendasDto) {}
