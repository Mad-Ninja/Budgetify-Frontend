import { TestBed } from '@angular/core/testing';

import { BudgetifyService } from './budgetify.service';

xdescribe('BudgetifyService', () => {
  let service: BudgetifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
