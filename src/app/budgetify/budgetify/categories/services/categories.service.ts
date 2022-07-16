import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { ICategory } from 'src/app/models/categories';
import { ITransaction } from 'src/app/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  filter:string='';
  public categories:ICategory[];
  isCategories: boolean;

  allUserTransactions:ITransaction[]=[];
  
  constructor(private http: HttpClient,) {}


  editCategory(category:ICategory, id:string){
    return this.http.patch(
      'https://arcane-castle-89963.herokuapp.com/categories/' + id,
      category
    );
  }

  deleteCategory(name:string, type:string){
    return this.http.delete(
      'https://arcane-castle-89963.herokuapp.com/categories/' + name + '/' + type,
    );
  }
}
