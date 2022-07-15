import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ICard } from 'src/app/models/cards';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  
  constructor(
    public cardService: CardService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.cardService.getAccounts();
  }
}
