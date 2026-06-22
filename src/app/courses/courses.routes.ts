import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CourseComponent} from './course/course.component';
import {LessonDetailComponent} from './lesson/lesson-detail.component';
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {authGuard, authGuardChild} from '../services/auth.guard';
import {confirmExitGuard} from '../services/confirm-exit.guard';
import {courseResolver} from './services/course.resolver';
import {lessonsResolver} from './services/lessons.resolver';
import {lessonDetailResolver} from './services/lesson-detail.resolver';

export const COURSES_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':courseUrl',
        component: CourseComponent,
        canActivate: [authGuard],
        canActivateChild: [authGuardChild],
        canDeactivate: [confirmExitGuard],
        resolve: {
            course: courseResolver
        },
        children: [
            {
                path: '',
                component: LessonsListComponent,
                resolve: {
                    lessons: lessonsResolver
                }
            },
            {
                path: 'lessons/:lessonSeqNo',
                component: LessonDetailComponent,
                resolve: {
                    lesson: lessonDetailResolver
                }
            }
        ]
    }
];
