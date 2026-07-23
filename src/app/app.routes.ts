import {Routes} from '@angular/router';
import {authGuard, authGuardChild} from './services/auth.guard';
import {courseResolver} from './courses/services/course.resolver';
import {confirmExitGuard} from './services/confirm-exit.guard';
import {loginMatcher} from "./services/login.matcher";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: "full"
  },
  {
    matcher: loginMatcher,
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      preload:true
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
    data: {
      preload:true
    }
  },
  {
    path: 'course-page/:courseUrl',
    redirectTo: ({params}) => `/courses/${params['courseUrl']}`
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
