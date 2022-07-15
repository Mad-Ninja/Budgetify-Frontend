import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { ITransaction } from 'src/app/models/transactions';
import { CardService } from '../../card/services/card.service';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  sortToogle:boolean;
  search:string='';
  constructor(
    public transactionService: TransactionsService,
    public cardService: CardService,
  ) {}

  sortTransactionsFromDate() { 
    if(this.sortToogle){
      this.transactionService.transactionsCards = [...this.transactionService.transactionsCards.sort(
        (a, b) =>
          new Date(b.dateOfPayment).getTime() -
          new Date(a.dateOfPayment).getTime()
      )];
    }
    if(!this.sortToogle){
      this.transactionService.transactionsCards = [...this.transactionService.transactionsCards.sort(
        (a, b) =>
          new Date(a.dateOfPayment).getTime() -
          new Date(b.dateOfPayment).getTime()
      )];
    }
    this.sortToogle = !this.sortToogle;
  }
  ngOnInit(): void {}
}
