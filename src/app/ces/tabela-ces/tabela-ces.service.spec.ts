import { TestBed } from '@angular/core/testing';

import { TabelaCesService } from '../../service/tabela-ces.service';

describe('TabelaCesService', () => {
  let service: TabelaCesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaCesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
