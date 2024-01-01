import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPdfComponent } from './subject-pdf.component';

describe('SubjectPdfComponent', () => {
  let component: SubjectPdfComponent;
  let fixture: ComponentFixture<SubjectPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
