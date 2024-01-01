import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesNotesComponent } from './classes-notes.component';

describe('ClassesNotesComponent', () => {
  let component: ClassesNotesComponent;
  let fixture: ComponentFixture<ClassesNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
