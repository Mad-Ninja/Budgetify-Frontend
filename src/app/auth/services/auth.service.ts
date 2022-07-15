import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAuth } from 'src/app/models/auth';
import { CardService } from 'src/app/budgetify/budgetify/card/services/card.service';
import { TransactionsService } from 'src/app/budgetify/budgetify/main/transactions/services/transactions.service';
import { CategoriesService } from 'src/app/budgetify/budgetify/categories/services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  expiresIn: string | null | undefined;

  constructor(
    private http: HttpClient,
    private cardService: CardService,
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService
  ) {}

  login(email: string, password: string) {
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http
      .post<IAuth>('http://localhost:3000/login', body, {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        tap((res: IAuth) => {
          this.setSession(res);
        })
      );
  }

  isLoggedIn() {
    this.expiresIn = localStorage.getItem('expiresIn');
    if (this.expiresIn) {
      return Math.round(Date.now()) < Number(this.expiresIn);
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('id');
    localStorage.removeItem('userCountry');
    this.cardService.accountCards = [];
    this.cardService.selectedIndex = 0;
    this.transactionsService.transactionsCards = [];
    this.categoriesService.allUserTransactions = [];
  }

  private setSession(res: IAuth) {
    const expiresIn = Math.round(Date.now()) + Number(res.expiresIn);
    localStorage.setItem('idToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
    localStorage.setItem('id', res.id);
    localStorage.setItem('userCountry', res.country);
  }
}
