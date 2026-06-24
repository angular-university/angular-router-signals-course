import {Routes} from '@angular/router';

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
