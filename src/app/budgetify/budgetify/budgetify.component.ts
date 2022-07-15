import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { BudgetifyService } from '../services/budgetify.service';
import { AddBtnService } from './add-button/services/add-btn.service';
import { CardService } from './card/services/card.service';
import { CategoriesService } from './categories/services/categories.service';
import { TransactionsService } from './main/transactions/services/transactions.service';
import { SidenavService } from './sidenav/services/sidenav.service';

@Component({
  selector: 'app-budgetify',
  templateUrl: './budgetify.component.html',
  styleUrls: ['./budgetify.component.scss'],
})
export class BudgetifyComponent implements OnInit {
  authUserId: string = localStorage.getItem('id')!;
  showHeader!: boolean;
  @ViewChild('sidenavVariable') public myNav!: MatSidenav;
  transactionService: any;
  constructor(
    private renderer: Renderer2,
    public budgetifyService: BudgetifyService,
    private cardService: CardService,
    private sidenavService: SidenavService,
    private addBtnService: AddBtnService,
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.cardService.componentMethodCalled$.subscribe(() => {
      this.myNav.open();
    });
    this.transactionsService.componentMethodCalled$.subscribe(() => {
      this.myNav.open();
    });
    this.sidenavService.componentMethodCalled$.subscribe(() => {
      this.myNav.close();
    });
    this.addBtnService.componentMethodCalled$.subscribe(() => {
      this.myNav.open();
    });
    
  }

  getUser(authUserId: string) {
    this.budgetifyService.getUserData(authUserId).subscribe((userData) => {
      this.showHeader = true;


    });
  }

  
  removeBodyClass() {
    this.renderer.removeClass(document.body, 'body__login-page');
  }
  ngOnInit(): void {
    this.removeBodyClass();
    this.getUser(this.authUserId);
    this.budgetifyService.findUserCurrenceCode();
    
    
  }
}
