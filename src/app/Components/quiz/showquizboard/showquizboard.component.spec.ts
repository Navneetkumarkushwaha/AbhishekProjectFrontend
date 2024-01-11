import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowquizboardComponent } from './showquizboard.component';

describe('ShowquizboardComponent', () => {
  let component: ShowquizboardComponent;
  let fixture: ComponentFixture<ShowquizboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowquizboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowquizboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
