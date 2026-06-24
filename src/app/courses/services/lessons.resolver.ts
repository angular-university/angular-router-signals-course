import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {LessonSummary} from '../model/lesson-summary';

export const lessonsResolver: ResolveFn<LessonSummary[]> = (route) => {
    const courseUrl = route.paramMap.get('courseUrl');
    return inject(HttpClient)
        .get<{payload: LessonSummary[]}>('/api/lessons', {params: {pageSize: '10000', courseUrl}})
        .pipe(map(res => res.payload));
};
