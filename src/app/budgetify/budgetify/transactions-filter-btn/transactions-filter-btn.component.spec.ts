import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFilterBtnComponent } from './transactions-filter-btn.component';

describe('TransactionsFilterBtnComponent', () => {
  let component: TransactionsFilterBtnComponent;
  let fixture: ComponentFixture<TransactionsFilterBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsFilterBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsFilterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
