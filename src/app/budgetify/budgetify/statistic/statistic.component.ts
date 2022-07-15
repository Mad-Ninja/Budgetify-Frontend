import { Component, Input, OnInit } from '@angular/core';
import { StatisticService } from './services/statistic.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from '../card/services/card.service';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { ITransaction } from 'src/app/models/transactions';
import { CategoriesService } from '../categories/services/categories.service';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  maxDate = Date();

  noStatExp: boolean = true;
  buttonValue?: string = 'categories';
  isShowCategories: boolean = true;
  isShowMonthly: boolean = false;

  totalExpensesSum: string;

  january: ITransaction[] = [];
  february: ITransaction[] = [];
  march: ITransaction[] = [];
  april: ITransaction[] = [];
  may: ITransaction[] = [];
  june: ITransaction[] = [];
  july: ITransaction[] = [];
  august: ITransaction[] = [];
  september: ITransaction[] = [];
  october: ITransaction[] = [];
  november: ITransaction[] = [];
  december: ITransaction[] = [];

  transactionsFilteredByRange: ITransaction[] =
    this.transactionsService.transactionsCards;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private categoriesService: CategoriesService,
    public statisticService: StatisticService,
    public cardService: CardService,
    public transactionsService: TransactionsService
  ) {
    this.cardService.componentMethodCalled1$.subscribe(() => {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards;
    });
    this.cardService.componentMethodCalled1$.subscribe(() => {
      this.getCategoriesStat();
    });
  }


  displayedColumnsCategories: string[] = ['category', 'amount', 'total'];
  dataSource = this.statisticService.CATEGORIES_STATISTIC;
  displayedColumnsMonthly: string[] = [
    'month',
    'income',
    'expense',
    'economy',
    'percentOfEconomy',
  ];

  toggleDisplay() {
    if (this.buttonValue == 'monthly') {
      this.isShowCategories = false;
      this.isShowMonthly = true;
    } else if (this.buttonValue == 'categories') {
      this.isShowCategories = true;
      this.isShowMonthly = false;
    }
  }

  selectDateStart() {
    this.getMonthStat();

    this.transactionsFilteredByRange = [];
    if (this.range.value.start?._d === null) {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards;
      this.getCategoriesStat();
      return;
    }
    this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards.filter((transaction) => {
        return (
          new Date(transaction.dateOfPayment) >=
          new Date(this.range.value.start?._d)
        );
      });

    this.getCategoriesStat();
  }

  selectDateEnd() {
    this.transactionsFilteredByRange = [];
    if (this.range.value.start?._d == undefined) {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards;
      this.getCategoriesStat();
      return;
    }

    if (
      this.range.value.start?._d != undefined &&
      this.range.value.end?._d == undefined
    ) {
      this.transactionsFilteredByRange =
        this.transactionsService.transactionsCards.filter((transaction) => {
          return (
            new Date(transaction.dateOfPayment) >=
            new Date(this.range.value.start?._d)
          );
        });
      this.getCategoriesStat();
      return;
    }

    this.transactionsFilteredByRange =
      this.transactionsService.transactionsCards.filter((transaction) => {
        return (
          new Date(transaction.dateOfPayment) >=
            new Date(this.range.value.start?._d) &&
          new Date(transaction.dateOfPayment) <=
            new Date(this.range.value.end?._d)
        );
      });

    this.getCategoriesStat();
  }

  getCategoriesStat() {
    const map = new Map();
    const totalSum = this.transactionsFilteredByRange.reduce(
      (accum, current) => {
        if (current.type === 'Income') {
          return accum;
        }
        return accum + current.amount;
      },
      0
    );
    if (totalSum === 0) {
      this.noStatExp = false;
    } else {
      this.noStatExp = true;
    }
    this.transactionsFilteredByRange.forEach((transaction: ITransaction) => {
      if (transaction.type === 'Income') {
        return;
      }
      transaction.category.forEach((categoryName: string) => {
        if (!map.get(categoryName)) {
          const percent = +((transaction.amount / totalSum) * 100).toFixed(1);
          map.set(categoryName, {
            category: categoryName,
            amount: transaction.amount,
            total: percent,
          });
          return;
        }
        const cat = map.get(categoryName);
        cat['amount'] += transaction.amount;
        cat['total'] = +((cat['amount'] / totalSum) * 100).toFixed(1);
      });
    });
    this.statisticService.CATEGORIES_STATISTIC = [...map.values()];
    this.totalExpensesSum =
      totalSum +
      this.cardService.accountCards[this.cardService.selectedIndex].currency
        .symbolNative;
  }

  getMonthStat() {
    this.january = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 0;
    });
    this.february = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 1;
    });
    this.march = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 2;
    });
    this.april = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 3;
    });
    this.may = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 4;
    });
    this.june = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 5;
    });
    this.july = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 6;
    });
    this.august = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 7;
    });
    this.september = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 8;
    });
    this.october = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 9;
    });
    this.november = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 10;
    });
    this.december = this.transactionsFilteredByRange.filter((transaction) => {
      return new Date(transaction.dateOfPayment).getMonth() === 11;
    });
  }

  ngOnInit(): void {
    this.cardService.getAccounts();
    this.getCategoriesStat();
    this.getMonthStat();
    this.categoriesService.allUserTransactions = [];
  }
}
