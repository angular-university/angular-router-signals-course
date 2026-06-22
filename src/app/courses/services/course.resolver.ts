import {inject} from '@angular/core';
import {ResolveFn, ActivatedRouteSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {CoursesService} from './courses.service';

export const courseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot) => {
    return inject(CoursesService).loadCourseByUrl(route.paramMap.get('courseUrl'));
};
