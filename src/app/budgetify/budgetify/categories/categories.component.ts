import { Component, OnInit } from '@angular/core';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CategoriesService } from './services/categories.service';
import { BudgetifyService } from '../../services/budgetify.service';
import { ICategory } from 'src/app/models/categories';
import { CardService } from '../card/services/card.service';
import { TransactionsService } from '../main/transactions/services/transactions.service';
import { ITransaction } from 'src/app/models/transactions';
import { HttpClient } from '@angular/common/http';
import { ICard } from 'src/app/models/cards';
import { tap } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  search:string='';
  constructor(
    public categoriesService: CategoriesService,
    public addBtnService: AddBtnService,
    public budgetifyService: BudgetifyService,
    public cardService: CardService,
    public transactionsService: TransactionsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.addBtnService.isCategoryPage = true;
    this.addBtnService.isMainPage = false;

    let accountCards: ICard[];
    
    this.http
      .get<ICard[]>('https://arcane-castle-89963.herokuapp.com/accounts')
      .pipe(
        tap((res: ICard[]) => {
          accountCards = res;          
          accountCards.forEach((account: ICard) => {
            let accountId = account._id;
            let transactionCards:ITransaction[];
            this.http
              .get<ITransaction[]>(
                'https://arcane-castle-89963.herokuapp.com/transactions/all/' + accountId
              )
              .pipe(
                tap((res: ITransaction[]) => {
                  transactionCards = res;
                  this.categoriesService.allUserTransactions.push(...transactionCards)
                  
                })
              ).subscribe(
                (data) => {},
                (error) => {}
              );
            
          });
        })
      )
      .subscribe(
        (data) => {},
        (error) => {}
      );

    

    
  }
}
