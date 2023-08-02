import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingaddressComponent } from './shippingaddress.component';

describe('ShippingaddressComponent', () => {
  let component: ShippingaddressComponent;
  let fixture: ComponentFixture<ShippingaddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingaddressComponent]
    });
    fixture = TestBed.createComponent(ShippingaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
