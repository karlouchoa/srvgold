import { IsOptional, IsString } from 'class-validator';
export class FilterRoleDto {
  @IsOptional() @IsString() nome?: string;
}
