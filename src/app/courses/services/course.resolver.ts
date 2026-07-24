import {inject} from '@angular/core';
import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course} from '../model/course';

export const courseResolver: ResolveFn<Course> = async (route, state) => {
  const router = inject(Router);
  let course = router.currentNavigation()?.extras?.info?.['course'] as Course;
  if (course) {
    console.log('[courseResolver] Course loaded from navigation extras info:', course);
    return course;
  }
  const courseUrl = route.paramMap.get('courseUrl');
  console.log('No course in navigation extras state, fetching from API for courseUrl:', courseUrl);
  const http = inject(HttpClient);
  course = await firstValueFrom(http.get<Course>(`/api/courses/${courseUrl}`));
  if (course) {
    return course;
  }
  return new RedirectCommand(router.parseUrl("not-found"), {
    browserUrl: state.url
  });
};
