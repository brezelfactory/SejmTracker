import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingSelectorComponent } from './proceeding-selector.component';

describe('ProceedingSelectorComponent', () => {
  let component: ProceedingSelectorComponent;
  let fixture: ComponentFixture<ProceedingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceedingSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
