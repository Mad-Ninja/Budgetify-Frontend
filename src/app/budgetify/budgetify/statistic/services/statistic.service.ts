import { Injectable } from '@angular/core';

interface CategoriesStatistic {
  category: string;
  amount: number;
  total: number;
}
interface MonthlyStatistic {
  month: string;
  income: number;
  expense: number;
  economy: number;
  percentOfEconomy: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  CATEGORIES_STATISTIC: CategoriesStatistic[] = [];



  totalIncome:number;
  totalExpense:number;
  totalEconomy:number;

  MONTHLY_STATISTIC: MonthlyStatistic[] = [];


  
  constructor() {}

  getTotalIncome() {
   const total = this.MONTHLY_STATISTIC.map((t) => t.income).reduce(
      (acc, value) => acc + value,
      0
    );
    this.totalIncome = total;
    return total;
  }
  getTotalExpenses() {
    const total = this.MONTHLY_STATISTIC.map((t) => t.expense).reduce(
      (acc, value) => acc + value,
      0
    );
    this.totalExpense = total;
    return total;
  }
  getTotalEconomy() {
    const total=  this.MONTHLY_STATISTIC.map((t) => t.economy).reduce(
      (acc, value) => acc + value,
      0
    ); 
    this.totalEconomy = total;
    return total;
  }
  getTotalPercentOfEconomy() {
    return this.totalEconomy*100/this.totalIncome
  }
}
