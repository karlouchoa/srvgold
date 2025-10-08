// src/pagamentos/dto/formas/update-forma.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateFormaDto } from './create-forma.dto';
export class UpdateFormaDto extends PartialType(CreateFormaDto) {}
