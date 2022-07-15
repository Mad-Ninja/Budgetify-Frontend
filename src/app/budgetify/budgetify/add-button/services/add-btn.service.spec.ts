import { TestBed } from '@angular/core/testing';

import { AddBtnService } from './add-btn.service';

xdescribe('AddBtnService', () => {
  let service: AddBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
