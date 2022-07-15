import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { currencies } from 'currencies.json';
import { ICurrency } from 'src/app/models/currency';
import { ICategory } from 'src/app/models/categories';
import countriesJson from '../../../assets/countries.json';
import { CategoriesService } from '../budgetify/categories/services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetifyService {
  user: UserModel = {
    _id: '',
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
    gender: '',
    birth: '',
    country: '',
    categories: [],
  };

  public countries = countriesJson;
  public currentUserCurrenceCode!: string;
  public currenciesMy!: ICurrency[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  findUserCurrenceCode() {
    this.currenciesMy = currencies.map((obj) => {
      let result: ICurrency = {
        name: '',
        code: '',
        symbolNative: '',
      };
      result.name = obj.name;
      result.code = obj.code;
      result.symbolNative = obj.symbolNative;
      return result;
    });
    const currentUserCountry = this.countries.filter(
      (obj) => obj.countryName == localStorage.getItem('userCountry')
    );
    this.currentUserCurrenceCode = currentUserCountry[0].currencyCode;
  }

  getUserData(authUserId: string) {
    return this.http
      .get<UserModel>('http://localhost:3000/users/' + authUserId)
      .pipe(
        tap((res: UserModel) => {
          this.user = res;
          this.categoriesService.categories =
            this.user.categories;
          if (this.categoriesService.categories.length > 0) {
            this.categoriesService.isCategories = true;
          } else {
            this.categoriesService.isCategories = false;
          }
        })
      );
  }
}
