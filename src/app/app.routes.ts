import {Routes} from '@angular/router';
import {courseResolver} from './courses/services/course.resolver';
import {confirmExitGuard} from './services/confirm-exit.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/courses',
        pathMatch: 'full'
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
        path: 'edit-course/:courseUrl',
        title: 'Edit Course',
        loadComponent: () => import('./courses/course-edit/course-edit.component').then(m => m.CourseEditComponent),
        resolve: {course: courseResolver},
        canDeactivate: [confirmExitGuard],
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
