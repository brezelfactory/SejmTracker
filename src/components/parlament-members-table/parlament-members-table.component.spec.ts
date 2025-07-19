import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlamentMembersTableComponent } from './parlament-members-table.component';

describe('ParlamentMembersTableComponent', () => {
  let component: ParlamentMembersTableComponent;
  let fixture: ComponentFixture<ParlamentMembersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParlamentMembersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParlamentMembersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
