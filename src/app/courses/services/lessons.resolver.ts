import {inject} from '@angular/core';
import {ResolveFn, ActivatedRouteSnapshot} from '@angular/router';
import {LessonSummary} from '../model/lesson-summary';
import {CoursesService} from './courses.service';

export const lessonsResolver: ResolveFn<LessonSummary[]> = (route: ActivatedRouteSnapshot) => {
    return inject(CoursesService).loadAllCourseLessonsSummary(route.paramMap.get('courseUrl'));
};
