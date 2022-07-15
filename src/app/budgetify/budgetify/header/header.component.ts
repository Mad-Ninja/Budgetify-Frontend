import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UserModel } from 'src/app/models/user';
import { BudgetifyService } from '../../services/budgetify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: UserModel = this.budgetifyService.user;
  fullUserName: string = '';
  constructor(
    private authService: AuthService,
    private budgetifyService: BudgetifyService,
    private router: Router
  ) {}

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.fullUserName = this.user.firstName + ' ' + this.user.lastName;
  }
}
