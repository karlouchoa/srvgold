import { PartialType } from '@nestjs/mapped-types';
import { CreateRetornoDto } from './create-retorno.dto';
export class UpdateRetornoDto extends PartialType(CreateRetornoDto) {}
