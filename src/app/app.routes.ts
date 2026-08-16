import { Routes } from '@angular/router';
import { InvitationPage } from './pages/invitation-page/invitation-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { PublicPage } from './pages/public-page/public-page';

export const routes: Routes = [
  { path: '', component: PublicPage },
  { path: 'admin', component: AdminPage },
  { path: ':guid', component: InvitationPage },
];
