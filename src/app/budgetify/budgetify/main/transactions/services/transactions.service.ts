import { Injectable,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { ITransaction } from 'src/app/models/transactions';
import { CardService } from '../../../card/services/card.service';
import { SidenavService } from '../../../sidenav/services/sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  filter:string='';
  public transactionsCards: ITransaction[] = [];
  selectedIndex = 0;
  transactionSelectedID:string;

  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(
    private http: HttpClient,
    private sidenavService: SidenavService
  ) {}
  transactionIcon(type: string) {
    return type == 'Expenses' ? 'arrow_upward' : 'arrow_downward';
  }

  getTransactions(accountId: string) {
    return this.http
      .get<ITransaction[]>(
        'https://arcane-castle-89963.herokuapp.com/transactions/all/' + accountId
      )
      .pipe(
        tap((res: ITransaction[]) => {
          this.transactionsCards = res;
        })
      );
  }

  onClickTransactionCard(indexOfelement:number) {
    this.selectedIndex = indexOfelement;
    this.transactionSelectedID = this.transactionsCards[indexOfelement]._id;
    this.sidenavService.transactionId = this.transactionSelectedID;
    this.sidenavService.changeSidenavContent('isTransactionInfo');
    this.sidenavService.transactionInfoTitle = this.transactionsCards[indexOfelement].title;
    this.sidenavService.transactionInfoType = this.transactionsCards[indexOfelement].type;
    this.sidenavService.transactionInfoAmount = this.transactionsCards[indexOfelement].amount;
    this.sidenavService.transactionInfoTitle = this.transactionsCards[indexOfelement].title;
    this.sidenavService.transactionInfoCategory = Array.from(this.transactionsCards[indexOfelement].category);
    this.sidenavService.transactionInfoDate = this.transactionsCards[indexOfelement].dateOfPayment;
    this.sidenavService.transactionInfoPayee = this.transactionsCards[indexOfelement].payee;
    this.sidenavService.transactionInfoDescription = this.transactionsCards[indexOfelement].description;
    this.componentMethodCallSource.next(void 0);
  }

 
}
