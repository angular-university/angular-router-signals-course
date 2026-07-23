import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course} from '../model/course';

export const courseResolver: ResolveFn<Course> = async (route) => {
  const router = inject(Router);
  const course = router.currentNavigation()?.extras?.info?.['course'] as Course;
  if (course) {
    console.log('[courseResolver] Course loaded from navigation extras info:', course);
    return course;
  }
  const courseUrl = route.paramMap.get('courseUrl');
  console.log('No course in navigation extras state, fetching from API for courseUrl:', courseUrl);
  const http = inject(HttpClient);
  return firstValueFrom(http.get<Course>(`/api/courses/${courseUrl}`));
};
