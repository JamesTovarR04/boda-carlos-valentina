import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  password = '';
  error = signal(false);

  constructor(private router: Router) {}

  submit(): void {
    if (this.password === environment.adminPassword) {
      sessionStorage.setItem('admin_auth', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.error.set(true);
      this.password = '';
      setTimeout(() => this.error.set(false), 2500);
    }
  }
}
