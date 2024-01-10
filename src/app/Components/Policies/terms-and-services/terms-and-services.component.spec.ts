import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndServicesComponent } from './terms-and-services.component';

describe('TermsAndServicesComponent', () => {
  let component: TermsAndServicesComponent;
  let fixture: ComponentFixture<TermsAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
