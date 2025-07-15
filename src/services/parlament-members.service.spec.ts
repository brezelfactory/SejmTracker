import { TestBed } from '@angular/core/testing';

import { ParlamentMembersService } from './parlament-members.service';

describe('ParlamentMembersService', () => {
  let service: ParlamentMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParlamentMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
