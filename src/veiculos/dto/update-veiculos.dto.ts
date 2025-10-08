import { PartialType } from '@nestjs/mapped-types';
import { CreateVeiculosDto } from './create-veiculos.dto';

export class UpdateVeiculosDto extends PartialType(CreateVeiculosDto) {}
