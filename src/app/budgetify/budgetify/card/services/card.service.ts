import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../../main/transactions/services/transactions.service';
import { SidenavService } from '../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public accountCards: ICard[] = [];
  isTransactions: boolean = false;
  isAccounts: boolean = false;
  selectedIndex = 0;
  accountSelectedID!:string;

  private componentMethodCallSource = new Subject<any>();
  public componentMethodCallSource1 = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  componentMethodCalled1$ = this.componentMethodCallSource1.asObservable();

  constructor(
    private http: HttpClient,
    private transactionService: TransactionsService,
    private budgetifyService: BudgetifyService,
    private sidenavService: SidenavService
  ) {}

  getAccounts() {
    this.http.get<ICard[]>('https://arcane-castle-89963.herokuapp.com/accounts').subscribe(
      (data) => {
        this.isAccounts = true;
        this.accountCards = data;
        this.accountSelectedID = this.accountCards[this.selectedIndex]._id
        this.sidenavService.accountId = this.accountSelectedID;
        this.transactionService
          .getTransactions(this.accountSelectedID)
          .subscribe(
            (data) => {
              this.isTransactions = true;
            },
            (error) => {
              this.isTransactions = false;
            }
          );
      },
      (error) => {
        this.accountCards = [];
        this.isAccounts = false;
      }
    );;
  }

  clickOnCard(ev: any, index: any) {
    this.selectedIndex = index;
    this.accountSelectedID = this.accountCards[index]._id;
    this.sidenavService.accountId = this.accountSelectedID;
    this.transactionService
      .getTransactions(this.accountCards[index]._id)
      .subscribe(
        (data) => {
          this.isTransactions = true;  
          this.componentMethodCallSource1.next(void 0); 
        },
        (error) => {
          this.isTransactions = false;
        }
      );
       
  }
  clickOnMoreDetails(event: any, index: any) {
    event.stopPropagation();
    this.sidenavService.changeSidenavContent('isAccountInfo');
    this.sidenavService.accountInfoTitle = this.accountCards[index].name;
    this.sidenavService.accountInfoBalance = this.accountCards[index].amount;
    this.sidenavService.accountInfoCurrencySymbol =
      this.accountCards[index].currency.symbolNative;
    this.sidenavService.accountInfoCurrencyCode =
      this.accountCards[index].currency.code;
    this.sidenavService.accountInfoDescription =
      this.accountCards[index].description;
    this.componentMethodCallSource.next(void 0);
  }
}
