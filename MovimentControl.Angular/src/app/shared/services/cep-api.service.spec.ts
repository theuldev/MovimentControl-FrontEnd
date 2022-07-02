import { TestBed } from '@angular/core/testing';

import { CepApiService } from './cep-api.service';

describe('CepApiService', () => {
  let service: CepApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
