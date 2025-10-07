import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';

class CreateTenantDto {
  name: string;
  slug: string;
}

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.createTenant(dto);
  }
}
