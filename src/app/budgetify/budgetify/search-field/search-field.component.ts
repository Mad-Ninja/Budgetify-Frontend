import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../main/transactions/services/transactions.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  
  constructor(public transactionService: TransactionsService) {}
  ngOnInit(): void {}
}
