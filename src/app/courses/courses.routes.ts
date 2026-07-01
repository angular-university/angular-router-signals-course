import {Routes} from '@angular/router';
import {authGuardChild} from '../services/auth.guard';
import {canMatchAuth} from '../services/can-load-auth.guard';
import {featureFlagGuard} from '../services/feature-flag.guard';
import {courseResolver} from './services/course.resolver';
import {lessonsResolver} from './services/lessons.resolver';
import {lessonDetailResolver} from './services/lesson-detail.resolver';
import {LessonProgressService} from './services/lesson-progress.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  }
];
