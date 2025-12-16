import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then((com) => com.SignUpComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.component').then((com) => com.ChatComponent),
    canActivate: [authGuard],  // 👈 protect this route
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((com) => com.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'login', // initial landing page on load
    pathMatch: 'full'
  }
];
