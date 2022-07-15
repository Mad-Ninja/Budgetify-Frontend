import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ICurrency } from 'src/app/models/currency';

import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { HttpClient } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';
import { ICategory } from 'src/app/models/categories';
import { FormControl } from '@angular/forms';
import { CardService } from '../../card/services/card.service';
import { ICard } from 'src/app/models/cards';
import { ITransaction } from 'src/app/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  popupTitle!: string;
  popupText!: string;

  accountInfoTitle!: string;
  accountInfoBalance!: number;
  accountInfoCurrencySymbol!: string;
  accountInfoCurrencyCode!: string;
  accountInfoDescription!: string;
  accountId!:string;
  isAccountInfo!: boolean;
  isAccountAdd!: boolean;
  isAccountEdit!: boolean;

  transactionId!:string;
  transactionInfoTitle!: string;
  transactionInfoType!: string;
  transactionInfoAmount!: number;
  transactionInfoCategory:string[] = [];
  transactionInfoDate!: string;
  transactionInfoPayee!: string;
  transactionInfoDescription!: string;
  isTransactionInfo!: boolean;
  isTransactionAdd!: boolean;
  isTransactionEdit!: boolean;
  filterCategoriesForTransactionAdd!: ICategory[];

  isCategoryAdd!: boolean;

  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(
    private budgetifyService: BudgetifyService,
    private http: HttpClient,
    private toaster: Toaster
  ) {}

  showToast(textin: string , typein:any) {
    this.toaster.open({
      text: textin,
      type: typein,
      duration: 5000,
      position: 'top-center',
    });
  }

  changeSidenavContent(target: string) {
    if (target === 'isAccountAdd') {
      this.isAccountAdd = true;
      this.isAccountInfo = false;
      this.isAccountEdit = false;
      this.isCategoryAdd = false;
      this.isTransactionInfo = false;
      this.isTransactionAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isAccountInfo') {
      this.popupTitle = 'Delete account';
      this.popupText = 'Are you sure you want to delete this account?';
      this.isAccountInfo = true;
      this.isAccountAdd = false;
      this.isAccountEdit = false;
      this.isCategoryAdd = false;
      this.isTransactionInfo = false;
      this.isTransactionAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isAccountEdit') {
      this.isAccountEdit = true;
      this.isAccountInfo = false;
      this.isAccountAdd = false;
      this.isCategoryAdd = false;
      this.isTransactionInfo = false;
      this.isTransactionAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isCategoryAdd') {
      this.isCategoryAdd = true;
      this.isAccountInfo = false;
      this.isAccountEdit = false;
      this.isAccountAdd = false;
      this.isTransactionInfo = false;
      this.isTransactionAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isTransactionInfo') {
      this.popupTitle = 'Delete transaction';
      this.popupText = 'Are you sure you want to delete this transaction?';
      this.isTransactionInfo = true;
      this.isAccountInfo = false;
      this.isAccountEdit = false;
      this.isAccountAdd = false;
      this.isCategoryAdd = false;
      this.isTransactionAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isTransactionAdd') {
      this.isTransactionAdd = true;
      this.isTransactionInfo = false;
      this.isAccountInfo = false;
      this.isAccountEdit = false;
      this.isAccountAdd = false;
      this.isCategoryAdd = false;
      this.isTransactionEdit = false;
    } else if (target === 'isTransactionEdit') {
      this.isTransactionEdit = true;
      this.isTransactionAdd = false;
      this.isTransactionInfo = false;
      this.isAccountInfo = false;
      this.isAccountEdit = false;
      this.isAccountAdd = false;
      this.isCategoryAdd = false;
    }
  }
  closeSidenav() {
    this.componentMethodCallSource.next(void 0);
  }

  addAccount(title: string, curr: ICurrency, description: string) {
    const account = {
      name: title,
      currency: curr,
      description: description,
    };
    return this.http.post('http://localhost:3000/accounts', account);
  }

  editAccount(editedAccount: any) {
    return this.http.patch(
      'http://localhost:3000/accounts/' + this.accountId,
      editedAccount
    );
  }

  deleteAccount(accountId: string) {
    return this.http.delete('http://localhost:3000/accounts/' + accountId);
  }

  addCategory(category: ICategory[]) {
    return this.http.post('http://localhost:3000/categories', category);
  }

  addTransaction(
    title: string,
    amount: number,
    date: string,
    payee: string,
    description: string,
    categories: string[],
    type: string,
    accountId: string,
    currencyCode: string
  ) {
    const transaction = {
      type: type,
      amount: amount,
      category: categories,
      title: title,
      dateOfPayment: date,
      payee: payee,
      description: description,
      currency: currencyCode,
      accountId: accountId,
    };

    return this.http.post(
      'http://localhost:3000/transactions/add/' + accountId,
      transaction
    );
  }

  editTransaction(
   transaction:ITransaction
  ){
    

    return this.http.patch(
      'http://localhost:3000/transactions/' + transaction._id,
      transaction
    );
  }

  deleteTransaction(){
    return this.http.delete('http://localhost:3000/transactions/' + this.transactionId);
  }
}
