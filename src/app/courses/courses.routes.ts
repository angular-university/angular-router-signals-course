import {Routes} from '@angular/router';
import {authGuardChild} from '../services/auth.guard';
import {canMatchAuth} from '../services/can-load-auth.guard';
import {confirmExitGuard} from '../services/confirm-exit.guard';
import {courseResolver} from './services/course.resolver';
import {lessonsResolver} from './services/lessons.resolver';
import {lessonDetailResolver} from './services/lesson-detail.resolver';

export const coursesRoutes: Routes = [
    {
        path: '',
        title: 'All Courses',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: ':courseUrl',
        loadComponent: () => import('./course/course.component').then(m => m.CourseComponent),
        canMatch: [canMatchAuth],
        canActivateChild: [authGuardChild],
        canDeactivate: [confirmExitGuard],
        resolve: {course: courseResolver},
        children: [
            {
                path: '',
                loadComponent: () => import('./lessons-list/lessons-list.component').then(m => m.LessonsListComponent),
                resolve: {lessons: lessonsResolver}
            },
            {
                path: 'lessons/:lessonSeqNo',
                loadComponent: () => import('./lesson/lesson-detail.component').then(m => m.LessonDetailComponent),
                resolve: {lesson: lessonDetailResolver}
            }
        ]
    }
];
