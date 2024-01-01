import { TestBed } from '@angular/core/testing';

import { PaymentSerService } from './payment-ser.service';

describe('PaymentSerService', () => {
  let service: PaymentSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
