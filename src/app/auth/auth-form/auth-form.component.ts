import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetifyService } from 'src/app/budgetify/services/budgetify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  errorMessage!: string;
  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private budgetifyService: BudgetifyService
  ) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (data) => {
       
        this.budgetifyService.findUserCurrenceCode();
        this.router.navigateByUrl('/budgetify/main');
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  addBodyClass() {
    this.renderer.addClass(document.body, 'body__login-page');
  }
  ngOnInit() {
    this.addBodyClass();
  }
}
