import {Routes} from '@angular/router';
import {authGuard, authGuardChild} from './services/auth.guard';
import {courseResolver} from './courses/services/course.resolver';
import {confirmExitGuard} from './services/confirm-exit.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: "full"
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.coursesRoutes)
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component')
      .then(m => m.PageNotFoundComponent)
  }
];
