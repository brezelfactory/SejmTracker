import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermSelectorComponent } from './term-selector.component';

describe('TermSelectorComponent', () => {
  let component: TermSelectorComponent;
  let fixture: ComponentFixture<TermSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
