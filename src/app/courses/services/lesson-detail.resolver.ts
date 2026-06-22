import {inject} from '@angular/core';
import {ResolveFn, ActivatedRouteSnapshot} from '@angular/router';
import {LessonDetail} from '../model/lesson-detail';
import {CoursesService} from './courses.service';

export const lessonDetailResolver: ResolveFn<LessonDetail> = (route: ActivatedRouteSnapshot) => {
    return inject(CoursesService).loadLessonDetail(
        route.paramMap.get('courseUrl'),
        route.paramMap.get('lessonSeqNo')
    );
};
