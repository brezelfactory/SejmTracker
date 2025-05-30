import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSelectorComponent } from './voting-selector.component';

describe('VotingSelectorComponent', () => {
  let component: VotingSelectorComponent;
  let fixture: ComponentFixture<VotingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
