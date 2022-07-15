import { Component, OnInit } from '@angular/core';
import { AddBtnService } from '../add-button/services/add-btn.service';
import { CardService } from '../card/services/card.service';
import { CategoriesService } from '../categories/services/categories.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  add_button_titles = ['Add Add Transaction', 'Add account'];
  constructor(public cardService: CardService, public addBtnService: AddBtnService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.addBtnService.isMainPage = true;
    this.addBtnService.isCategoryPage = false;
    this.categoriesService.allUserTransactions = [];
  }
}
