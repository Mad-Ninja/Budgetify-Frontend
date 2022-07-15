import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { CardService } from '../card/services/card.service';
import { SidenavService } from './services/sidenav.service';
import { BudgetifyService } from '../../services/budgetify.service';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { MatDialog } from '@angular/material/dialog';
import { ICard } from 'src/app/models/cards';
import { ICategory } from 'src/app/models/categories';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ICurrency } from 'src/app/models/currency';
import { ITransaction } from 'src/app/models/transactions';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  maxDate = new Date();
  buttonCategTypeValueControl = new FormControl('expense');

  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  categoriess: string[] = [];
  allCategoriess: string[] = [];

  alreadyExistCategory: boolean;
  invalid: boolean;
  invalid1: boolean = true;
  @ViewChild('catInput') public catInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') public chipList: ElementRef<HTMLInputElement>;

  @ViewChild('formAddAccount') public formAA: any;

  addAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      this.titleCardsUniqValidator.bind(this),
      this.noWhitespaceValidator,
    ]),
    currency: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  editAccountForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      this.titleCardsUniqValidator.bind(this),
      this.noWhitespaceValidator,
    ]),
    currency: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  addTransactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      this.noWhitespaceValidator,
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*.[0-9]{2}$'),
    ]),
    date: new FormControl('', [Validators.required]),
    payee: new FormControl('', [Validators.maxLength(30)]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });
  editTransactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      this.noWhitespaceValidator,
    ]),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.[0-9]{2}$'),
    ]),
    date: new FormControl('', [Validators.required]),
    payee: new FormControl('', [Validators.maxLength(30)]),
    description: new FormControl('', [Validators.maxLength(256)]),
  });

  addCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
      this.titleCategoriesUniqValidation.bind(this),
      this.noWhitespaceValidator,
    ]),
  });

  get title1() {
    return this.addAccountForm.get('title');
  }
  get description1() {
    return this.addAccountForm.get('description');
  }
  get title2() {
    return this.editAccountForm.get('title');
  }
  get description2() {
    return this.editAccountForm.get('description');
  }
  get titleCat() {
    return this.addCategoryForm.get('title');
  }
  get titleTran1() {
    return this.addTransactionForm.get('title');
  }
  get titleTran2() {
    return this.editTransactionForm.get('title');
  }
  get amount1() {
    return this.addTransactionForm.get('amount');
  }
  get amount2() {
    return this.editTransactionForm.get('amount');
  }
  get date1() {
    return this.addTransactionForm.get('date');
  }
  get date2() {
    return this.editTransactionForm.get('date');
  }
  get payee1() {
    return this.addTransactionForm.get('payee');
  }
  get payee2() {
    return this.editTransactionForm.get('payee');
  }
  get description3() {
    return this.addAccountForm.get('description');
  }
  get description4() {
    return this.editAccountForm.get('description');
  }

  constructor(
    public budgetifyService: BudgetifyService,
    public sidenavService: SidenavService,
    public cardService: CardService,
    public transactionService: TransactionsService,
    private addBtnService: AddBtnService,
    public dialog: MatDialog
  ) {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filter(category) : this.allCategoriess.slice()
      )
    );
    this.addBtnService.componentMethodCalled$.subscribe(() => {
      this.addAccountForm.patchValue({
        currency: this.budgetifyService.currentUserCurrenceCode,
      });
    });
    this.addBtnService.componentMethodCalled$.subscribe(() => {
      this.categoriesSortList('expense');
    });
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.invalid = false;
    this.invalid1 = false;

    if (value) {
      if (
        this.categoriess
          .map((el) => el.toLowerCase())
          .includes(value.toLowerCase())
      ) {
        this.alreadyExistCategory = true;
      } else {
        this.categoriess.push(value);
        this.alreadyExistCategory = false;
      }
    }
 
    event.chipInput!.clear();
    this.categoryCtrl.setValue(null);
  }
  remove(category: string): void {
    this.alreadyExistCategory = false;
    const index = this.categoriess.indexOf(category);

    if (index >= 0) {
      this.categoriess.splice(index, 1);
    }
    if (this.categoriess.length === 0) {
      this.invalid = true;
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.invalid = false;
    this.invalid1 = false;
    if (
      this.categoriess
        .map((el) => el.toLowerCase())
        .includes(event.option.viewValue.toLowerCase())
    ) {
      this.alreadyExistCategory = true;
    } else {
      this.categoriess.push(event.option.viewValue);
      this.alreadyExistCategory = false;
    }
    this.catInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategoriess.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
  }

  ttt() {}

  openDialog() {
    this.dialog.open(Popup);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  titleCardsUniqValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const title = control.value;
    if (
      title?.toLowerCase() ===
      this.sidenavService.accountInfoTitle?.toLocaleLowerCase()
    ) {
      return null;
    }
    const isTitleExist = this.cardService.accountCards.some(
      (card: ICard) => card.name?.toLowerCase() === title?.toLowerCase()
    );
    return isTitleExist ? { uniqTitle: true } : null;
  }

  titleCategoriesUniqValidation(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const title = control.value;
    const isTitleExist = this.budgetifyService.user.categories?.some(
      (category: ICategory) =>
        category.name?.toLowerCase() === title?.toLowerCase() &&
        category.type?.toLowerCase() ===
          this.buttonCategTypeValueControl.value?.toLowerCase()
    );
    return isTitleExist ? { uniqTitle: true } : null;
  }

  onSaveAccount() {
    const { title, currency, description } = this.addAccountForm.value;
    const curr = this.budgetifyService.currenciesMy.filter(
      (obj) => obj.code === currency
    )[0];
    this.sidenavService.addAccount(title, curr, description).subscribe(
      (data) => {
        this.sidenavService.closeSidenav();
        this.sidenavService.showToast('Account succesfuly created', 'success');
        this.cardService.getAccounts();
        this.cardService.selectedIndex = this.cardService.accountCards.length;
      },
      (error) => {}
    );
  }

  editAccountButton() {
    this.editAccountForm.patchValue({
      title: this.sidenavService.accountInfoTitle,
      currency: this.sidenavService.accountInfoCurrencyCode,
      description: this.sidenavService.accountInfoDescription,
    });
    this.sidenavService.changeSidenavContent('isAccountEdit');
  }
  editTransactionButton() {
    this.invalid1 = false;
    if (this.sidenavService.transactionInfoType === 'Expenses') {
      this.categoriesSortList('expense');
      this.buttonCategTypeValueControl.setValue('expense');
    } else {
      this.categoriesSortList('income');
      this.buttonCategTypeValueControl.setValue('income');
    }
    this.categoriess = Array.from(this.sidenavService.transactionInfoCategory);
    this.editTransactionForm.patchValue({
      title: this.sidenavService.transactionInfoTitle,
      amount: this.sidenavService.transactionInfoAmount,
      date: this.sidenavService.transactionInfoDate,
      payee: this.sidenavService.transactionInfoPayee,
      description: this.sidenavService.transactionInfoDescription,
    });
    this.invalid = false;
    this.sidenavService.changeSidenavContent('isTransactionEdit');
  }

  onEditAccount() {
    this.sidenavService.accountId = this.cardService.accountSelectedID;
    const { title, currency, description } = this.editAccountForm.value;
    const curr: ICurrency = this.budgetifyService.currenciesMy.filter(
      (obj) => obj.code === currency
    )[0];
    const editedAccount = {
      name: title,
      currency: curr,
      description: description,
    };

    this.sidenavService.editAccount(editedAccount).subscribe(
      (data) => {
        this.sidenavService.closeSidenav();
        this.sidenavService.showToast('Account succesfuly edited', 'success');
        this.cardService.getAccounts();
      },
      (error) => {}
    );
  }

  onAddCategory() {
    const { title } = this.addCategoryForm.value;
    const catType = this.buttonCategTypeValueControl.value;
    const category: ICategory[] = [
      {
        name: title,
        type: catType,
      },
    ];
    this.sidenavService.addCategory(category).subscribe(
      (data) => {
        this.sidenavService.closeSidenav();
        this.budgetifyService
          .getUserData(localStorage.getItem('id')!)
          .subscribe(
            (data) => {},
            (error) => {}
          );
        this.sidenavService.showToast('Category succesfuly created', 'success');
      },
      (error) => {}
    );
  }

  onAddTransaction() {
    const newCategories: ICategory[] = this.categoriess
      .filter((categoryName) => {
        if (
          this.budgetifyService.user.categories
            .filter(
              (obj) => obj.type === this.buttonCategTypeValueControl.value
            )
            .map((obj) => obj.name)
            .map((el) => el.toLowerCase())
            .includes(categoryName.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .map((item) => {
        return { name: item, type: this.buttonCategTypeValueControl.value };
      });

    if (newCategories.length > 0) {
      this.sidenavService.addCategory(newCategories).subscribe(
        (data) => {
          this.budgetifyService
            .getUserData(localStorage.getItem('id')!)
            .subscribe(
              (data) => {},
              (error) => {}
            );
          this.sidenavService.showToast(
            'Category succesfuly created',
            'success'
          );
        },
        (error) => {}
      );
    }
    const { title, amount, date, payee, description } =
      this.addTransactionForm.value;
    const categories = this.categoriess;
    const type =
      this.buttonCategTypeValueControl.value === 'expense'
        ? 'Expenses'
        : 'Income';
    const accountId = this.cardService.accountSelectedID;
    const currencyCode =
      this.cardService.accountCards[this.cardService.selectedIndex].currency
        .code;

    this.sidenavService
      .addTransaction(
        title,
        amount,
        date,
        payee,
        description,
        categories,
        type,
        accountId,
        currencyCode
      )
      .subscribe(
        (data) => {
          this.sidenavService.closeSidenav();
          this.sidenavService.showToast(
            'Transaction succesfuly created',
            'success'
          );
          if (type === 'Expenses') {
            this.cardService.accountCards[
              this.cardService.selectedIndex
            ].amount -= amount;
            +this.cardService.accountCards[
              this.cardService.selectedIndex
            ].amount.toFixed(2);
          } else if (type === 'Income') {
            this.cardService.accountCards[
              this.cardService.selectedIndex
            ].amount += Number(amount);
            +this.cardService.accountCards[
              this.cardService.selectedIndex
            ].amount.toFixed(2);
          }
          this.sidenavService
            .editAccount({
              amount:
                +this.cardService.accountCards[
                  this.cardService.selectedIndex
                ].amount.toFixed(2),
            })
            .subscribe(
              (data) => {},
              (error) => {}
            );
          this.transactionService.getTransactions(accountId).subscribe(
            (data) => {
              this.cardService.isTransactions = true;
            },
            (error) => {
              this.cardService.isTransactions = false;
            }
          );
        },
        (error) => {}
      );
  }
  onEditTransaction() {
    const newCategories: ICategory[] = this.categoriess
      .filter((categoryName) => {
        if (
          this.budgetifyService.user.categories
            .filter(
              (obj) => obj.type === this.buttonCategTypeValueControl.value
            )
            .map((obj) => obj.name)
            .map((el) => el.toLowerCase())
            .includes(categoryName.toLowerCase())
        ) {
          return false;
        }
        return false;
      })
      .map((item) => {
        return { name: item, type: this.buttonCategTypeValueControl.value };
      });
    if (newCategories.length > 0) {
      this.sidenavService.addCategory(newCategories).subscribe(
        (data) => {
          this.budgetifyService
            .getUserData(localStorage.getItem('id')!)
            .subscribe(
              (data) => {},
              (error) => {}
            );
          this.sidenavService.showToast(
            'Category succesfuly created',
            'success'
          );
        },
        (error) => {}
      );
    }

    const { title, amount, date, payee, description } =
      this.editTransactionForm.value;
    const categories = this.categoriess;
    const type =
      this.buttonCategTypeValueControl.value === 'expense'
        ? 'Expenses'
        : 'Income';
    const accountId = this.cardService.accountSelectedID;
    const currencyCode =
      this.cardService.accountCards[this.cardService.selectedIndex].currency
        .code;
    const transaction: ITransaction = {
      _id: this.sidenavService.transactionId,
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
    this.sidenavService.editTransaction(transaction).subscribe(
      (data) => {
        this.sidenavService.closeSidenav();
        this.sidenavService.showToast(
          'Transaction succesfuly edited',
          'success'
        );
        if (
          type === 'Expenses' &&
          this.sidenavService.transactionInfoType === 'Expenses'
        ) {
          this.cardService.accountCards[
            this.cardService.selectedIndex
          ].amount +=
            this.sidenavService.transactionInfoAmount - Number(amount);
          +this.cardService.accountCards[
            this.cardService.selectedIndex
          ].amount.toFixed(2);
        } else if (
          type === 'Income' &&
          this.sidenavService.transactionInfoType === 'Income'
        ) {
          this.cardService.accountCards[this.cardService.selectedIndex].amount =
            this.cardService.accountCards[this.cardService.selectedIndex]
              .amount -
            this.sidenavService.transactionInfoAmount +
            Number(amount);
          +this.cardService.accountCards[
            this.cardService.selectedIndex
          ].amount.toFixed(2);
        } else if (
          type === 'Expenses' &&
          this.sidenavService.transactionInfoType === 'Income'
        ) {
          this.cardService.accountCards[this.cardService.selectedIndex].amount =
            this.cardService.accountCards[this.cardService.selectedIndex]
              .amount -
            this.sidenavService.transactionInfoAmount -
            Number(amount);
          +this.cardService.accountCards[
            this.cardService.selectedIndex
          ].amount.toFixed(2);
        } else if (
          type === 'Income' &&
          this.sidenavService.transactionInfoType === 'Expenses'
        ) {
          this.cardService.accountCards[this.cardService.selectedIndex].amount =
            this.cardService.accountCards[this.cardService.selectedIndex]
              .amount +
            this.sidenavService.transactionInfoAmount +
            Number(amount);
          +this.cardService.accountCards[
            this.cardService.selectedIndex
          ].amount.toFixed(2);
        }
        this.sidenavService
          .editAccount({
            amount:
              this.cardService.accountCards[this.cardService.selectedIndex]
                .amount,
          })
          .subscribe(
            (data) => {},
            (error) => {}
          );
        this.transactionService.getTransactions(accountId).subscribe(
          (data) => {
            this.cardService.isTransactions = true;
          },
          (error) => {
            this.cardService.isTransactions = false;
          }
        );
      },
      (error) => {}
    );
  }

  changeValidStatusOfTitle() {
    this.addCategoryForm.get('title')?.setErrors(null);
  }

  categoriesSortList(type: string) {
    if (type === 'expense') {
      this.categoriess = [];
      const array = this.budgetifyService.user.categories
        .filter((obj) => obj.type === 'expense')
        .map((obj) => obj.name);
      this.categoryCtrl.setValue(null);
      this.allCategoriess = array!;
      this.categoryCtrl.setValue(null);
    }
    if (type === 'income') {
      this.categoriess = [];
      const array = this.budgetifyService.user.categories
        .filter((obj) => obj.type === 'income')
        .map((obj) => obj.name);
      this.categoryCtrl.setValue(null);
      this.allCategoriess = array!;
      this.categoryCtrl.setValue(null);
    }
  }

  ngOnInit(): void {}
}

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class Popup {
  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    private cardService: CardService,
    private transactionService: TransactionsService
  ) {}
  closeDialog() {
    this.dialog.closeAll();
  }
  yesBtnClick() {
    if (this.sidenavService.popupTitle === 'Delete account') {
      this.onDeleteAccount();
    }
    if (this.sidenavService.popupTitle === 'Delete transaction') {
      this.onDeleteTransaction();
    }
  }
  onDeleteAccount() {
    const accountId = this.cardService.accountSelectedID;
    if (this.cardService.selectedIndex === 0) {
      this.cardService.selectedIndex = 0;
    } else {
      this.cardService.selectedIndex--;
    }
    this.sidenavService.deleteAccount(accountId).subscribe((data) => {
      this.sidenavService.closeSidenav();
      this.sidenavService.showToast('Account succesfuly deleted', 'success');
      this.cardService.getAccounts();
    });
  }

  onDeleteTransaction() {
    const transactionId = this.sidenavService.transactionId;
    this.sidenavService.deleteTransaction().subscribe((data) => {
      this.sidenavService.closeSidenav();
      this.sidenavService.showToast(
        'Transaction succesfuly deleted',
        'success'
      );
      if (this.sidenavService.transactionInfoType === 'Expenses') {
        this.cardService.accountCards[this.cardService.selectedIndex].amount +=
          +this.sidenavService.transactionInfoAmount;
        +this.cardService.accountCards[
          this.cardService.selectedIndex
        ].amount.toFixed(2);
      } else if (this.sidenavService.transactionInfoType === 'Income') {
        this.cardService.accountCards[this.cardService.selectedIndex].amount -=
          +this.sidenavService.transactionInfoAmount;
        +this.cardService.accountCards[
          this.cardService.selectedIndex
        ].amount.toFixed(2);
      }
      this.sidenavService
        .editAccount({
          amount:
            +this.cardService.accountCards[this.cardService.selectedIndex]
              .amount,
        })
        .subscribe(
          (data) => {},
          (error) => {}
        );
      this.transactionService
        .getTransactions(this.sidenavService.accountId)
        .subscribe(
          (data) => {
            this.cardService.isTransactions = true;
          },
          (error) => {
            this.cardService.isTransactions = false;
          }
        );
    });
  }
}
