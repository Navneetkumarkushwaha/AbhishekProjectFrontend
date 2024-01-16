import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowloadNewPDFComponentComponent } from './dowload-new-pdfcomponent.component';

describe('DowloadNewPDFComponentComponent', () => {
  let component: DowloadNewPDFComponentComponent;
  let fixture: ComponentFixture<DowloadNewPDFComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DowloadNewPDFComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DowloadNewPDFComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
