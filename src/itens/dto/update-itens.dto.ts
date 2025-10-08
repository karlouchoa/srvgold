import { PartialType } from '@nestjs/mapped-types';
import { CreateItensDto } from './create-itens.dto';

export class UpdateItensDto extends PartialType(CreateItensDto) {}
