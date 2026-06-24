import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course} from '../model/course';

export const courseResolver: ResolveFn<Course> = async (route) => {
    const router = inject(Router);
    const course = router.currentNavigation()?.extras?.state?.['course'] as Course;
    if (course) return course;

    const courseUrl = route.paramMap.get('courseUrl');
    const http = inject(HttpClient);
    return firstValueFrom(http.get<Course>(`/api/courses/${courseUrl}`));
};
