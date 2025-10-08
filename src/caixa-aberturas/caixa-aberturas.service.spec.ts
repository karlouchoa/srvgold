import { Test, TestingModule } from '@nestjs/testing';
import { CaixaService } from './caixa-aberturas.service';

describe('CaixaService', () => {
  let service: CaixaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaixaService],
    }).compile();

    service = module.get<CaixaService>(CaixaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
