import {Routes} from '@angular/router';
import {courseResolver} from './services/course.resolver';
import {lessonsResolver} from './services/lessons.resolver';
import {lessonDetailResolver} from './services/lesson-detail.resolver';
import {LessonProgressService} from "./services/lesson-progress.service";
import {authGuard, authGuardChild} from "../services/auth.guard";
import {confirmExitGuard} from "../services/confirm-exit.guard";
import {coursePageMatcher} from "./services/coursePageMatcher";

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'edit-course/:courseUrl',
    loadComponent: () => import('./course-edit/course-edit.component').then(m => m.CourseEditComponent),
    resolve: {
      course: courseResolver
    },
    canActivate: [authGuard],
    canDeactivate: [confirmExitGuard]
  },
  {
    path: ':courseUrl',
    loadComponent: () => import('./course/course.component').then(m => m.CourseComponent),
    resolve: {
      course: courseResolver
    },
    canActivate: [authGuard],
    canActivateChild: [authGuardChild],
    children: [
      {
        path: '',
        loadComponent: () => import('./lessons-list/lessons-list.component').then(m => m.LessonsListComponent),
        resolve: {
          lessons: lessonsResolver
        }
      },
      {
        path: 'lessons/:lessonSeqNo',
        loadComponent: () => import('./lesson/lesson-detail.component').then(m => m.LessonDetailComponent),
        resolve: {
          lesson: lessonDetailResolver
        }
      }
    ]
  }];
