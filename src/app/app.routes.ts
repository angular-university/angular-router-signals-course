import {Routes} from '@angular/router';
import {authGuardChild} from './services/auth.guard';
import {canMatchAuth} from './services/can-load-auth.guard';
import {confirmExitGuard} from './services/confirm-exit.guard';
import {courseResolver} from './courses/services/course.resolver';
import {lessonsResolver} from './courses/services/lessons.resolver';
import {lessonDetailResolver} from './courses/services/lesson-detail.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
    },
    {
        path: 'courses',
        children: [
            {
                path: '',
                title: 'All Courses',
                loadComponent: () => import('./courses/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: ':courseUrl',
                loadComponent: () => import('./courses/course/course.component').then(m => m.CourseComponent),
                canMatch: [canMatchAuth],
                canActivateChild: [authGuardChild],
                canDeactivate: [confirmExitGuard],
                resolve: {course: courseResolver},
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./courses/lessons-list/lessons-list.component').then(m => m.LessonsListComponent),
                        resolve: {lessons: lessonsResolver}
                    },
                    {
                        path: 'lessons/:lessonSeqNo',
                        loadComponent: () => import('./courses/lesson/lesson-detail.component').then(m => m.LessonDetailComponent),
                        resolve: {lesson: lessonDetailResolver}
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        title: 'Login',
        data: {preload: true},
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'about',
        title: 'About',
        data: {preload: false},
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'helpdesk-chat',
        loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),
        outlet: 'chat'
    },
    {
        path: '**',
        title: 'Page Not Found',
        loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    }
];
