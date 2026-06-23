import {inject} from '@angular/core';
import {ResolveFn, ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Course} from '../model/course';

export const courseResolver: ResolveFn<Course> = (route) => {
    const courseUrl = route.paramMap.get('courseUrl');
    return inject(HttpClient).get<Course>(`/api/courses/${courseUrl}`);
};
