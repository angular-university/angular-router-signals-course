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
        canMatch: [featureFlagGuard('new-home')],
        loadComponent: () => import('./home-v2/home-v2.component').then(m => m.HomeV2Component)
    },
    {
        path: '',
        title: 'All Courses',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        // To match both /courses/18 and /courses/angular-router-course
        //   matcher: courseMatcher
        path: ':courseUrl',
        loadComponent: () => import('./course/course.component').then(m => m.CourseComponent),
        canMatch: [canMatchAuth],
        canActivateChild: [authGuardChild],
        providers: [LessonProgressService],
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
