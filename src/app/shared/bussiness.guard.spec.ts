import { TestBed, async, inject } from '@angular/core/testing';

import { BussinessGuard } from './bussiness.guard';

describe('BussinessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BussinessGuard]
    });
  });

  it('should ...', inject([BussinessGuard], (guard: BussinessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
