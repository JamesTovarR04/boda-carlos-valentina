import { Routes } from '@angular/router';
import { PublicPage } from './pages/public-page/public-page';
import { InvitationPage } from './pages/invitation-page/invitation-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: PublicPage },
  { path: 'login', component: LoginPage },
  { path: 'admin', component: AdminPage, canActivate: [authGuard] },
  { path: ':guid', component: InvitationPage },
];
