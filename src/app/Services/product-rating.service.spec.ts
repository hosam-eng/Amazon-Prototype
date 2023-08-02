import { TestBed } from '@angular/core/testing';

import { ProductRatingService } from './product-rating.service';

describe('ProductRatingService', () => {
  let service: ProductRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
