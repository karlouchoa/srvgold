import { Test, TestingModule } from '@nestjs/testing';
import { CaixaAberturasService } from './caixa-aberturas.service';

describe('CaixaAberturasService', () => {
  let service: CaixaAberturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaixaAberturasService],
    }).compile();

    service = module.get<CaixaAberturasService>(CaixaAberturasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
