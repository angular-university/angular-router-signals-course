import {Routes} from '@angular/router';
import {authGuard} from './services/auth.guard';
import {courseResolver} from './courses/services/course.resolver';
import {confirmExitGuard} from './services/confirm-exit.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
];
