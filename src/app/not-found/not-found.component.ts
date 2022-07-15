import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  backHome() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/budgetify/main');
    } else {
      this.router.navigateByUrl('/budgetify/main');
    }
  }

  ngOnInit(): void {}
}
