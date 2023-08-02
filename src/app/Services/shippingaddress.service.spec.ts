import { TestBed } from '@angular/core/testing';

import { ShippingaddressService } from './shippingaddress.service';

describe('ShippingaddressService', () => {
  let service: ShippingaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
