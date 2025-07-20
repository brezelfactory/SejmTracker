import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermSelectionComponent } from './term-selection.component';

describe('TermSelectionComponent', () => {
  let component: TermSelectionComponent;
  let fixture: ComponentFixture<TermSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
