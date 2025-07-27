import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlamentMemberDetailsComponent } from './parlament-member-details.component';

describe('ParlamentMemberDetailsComponent', () => {
  let component: ParlamentMemberDetailsComponent;
  let fixture: ComponentFixture<ParlamentMemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParlamentMemberDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParlamentMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
