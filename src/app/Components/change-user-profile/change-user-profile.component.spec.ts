import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserProfileComponent } from './change-user-profile.component';

describe('ChangeUserProfileComponent', () => {
  let component: ChangeUserProfileComponent;
  let fixture: ComponentFixture<ChangeUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUserProfileComponent]
    });
    fixture = TestBed.createComponent(ChangeUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
