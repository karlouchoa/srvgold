import { PartialType } from '@nestjs/mapped-types';
import { CreateCaixaAberturasDto } from './create-caixa-aberturas.dto';

export class UpdateCaixaAberturasDto extends PartialType(CreateCaixaAberturasDto) {}
