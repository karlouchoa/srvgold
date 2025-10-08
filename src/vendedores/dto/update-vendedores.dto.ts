import { PartialType } from '@nestjs/mapped-types';
import { CreateVendedoresDto } from './create-vendedores.dto';

export class UpdateVendedoresDto extends PartialType(CreateVendedoresDto) {}
