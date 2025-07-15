import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSelectionComponent } from './voting-selection.component';

describe('VotingSelectionComponent', () => {
  let component: VotingSelectionComponent;
  let fixture: ComponentFixture<VotingSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
