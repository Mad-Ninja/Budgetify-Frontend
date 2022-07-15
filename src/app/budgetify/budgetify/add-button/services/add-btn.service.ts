import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AddBtnService {
  isMainPage!:boolean;
  isCategoryPage!:boolean;
  
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  constructor(private sidenavService: SidenavService, public budgetifyService: BudgetifyService) { }

  addAccountClick(){
    this.sidenavService.changeSidenavContent('isAccountAdd');
    this.componentMethodCallSource.next(void 0);
  }

  addCategoryClick(){
    this.sidenavService.changeSidenavContent('isCategoryAdd');
    this.componentMethodCallSource.next(void 0);
  }

  addTransactionClick(){
    this.sidenavService.changeSidenavContent('isTransactionAdd');
    this.componentMethodCallSource.next(void 0);
  }
}
