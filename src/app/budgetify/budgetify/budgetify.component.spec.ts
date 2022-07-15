import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetifyComponent } from './budgetify.component';

xdescribe('BudgetifyComponent', () => {
  let component: BudgetifyComponent;
  let fixture: ComponentFixture<BudgetifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetifyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
