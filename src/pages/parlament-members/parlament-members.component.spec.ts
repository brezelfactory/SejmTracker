import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlamentMembersComponent } from './parlament-members.component';

describe('ParlamentMembersComponent', () => {
  let component: ParlamentMembersComponent;
  let fixture: ComponentFixture<ParlamentMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParlamentMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParlamentMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
