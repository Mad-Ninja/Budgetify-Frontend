import { Component, OnInit } from '@angular/core';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CategoriesService } from '../categories/services/categories.service';
import { TransactionsService } from '../main/transactions/services/transactions.service';

@Component({
  selector: 'app-transactions-filter-btn',
  templateUrl: './transactions-filter-btn.component.html',
  styleUrls: ['./transactions-filter-btn.component.scss'],
})
export class TransactionsFilterBtnComponent implements OnInit {
  
  constructor(
    public addBtnService: AddBtnService,
    public transactionsService: TransactionsService,
    public categoriesService: CategoriesService,
  ) {}

  incomeClick() {
    if(this.addBtnService.isMainPage){
      if(this.transactionsService.filter === '' || this.transactionsService.filter === 'Expenses'){
        this.transactionsService.filter = 'Income'
      }else {
        this.transactionsService.filter =''
      }
    }
    if(this.addBtnService.isCategoryPage){
      if(this.categoriesService.filter === '' || this.categoriesService.filter === 'expense'){
        this.categoriesService.filter = 'income'
      }else {
        this.categoriesService.filter =''
      }
    }
    
  }
  expenseClick() {
    if(this.addBtnService.isMainPage){
      if(this.transactionsService.filter === '' || this.transactionsService.filter === 'Income'){
        this.transactionsService.filter = 'Expenses'
      }else {
        this.transactionsService.filter =''
      }
    }
    if(this.addBtnService.isCategoryPage){
      if(this.categoriesService.filter === '' || this.categoriesService.filter === 'income'){
        this.categoriesService.filter = 'expense'
      }else {
        this.categoriesService.filter =''
      }
    }
    
  }
  ngOnInit(): void {}
}
