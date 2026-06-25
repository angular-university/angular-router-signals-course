import {Service, inject, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course, CoursesResponse} from '../model/course';
import {LessonDetail} from '../model/lesson-detail';
import {LessonsResponse, LessonSummary} from '../model/lesson-summary';

@Service()
export class CoursesService {
    private http = inject(HttpClient);

    allCourses() {
        return httpResource<Course[]>(() => '/api/courses', {
            parse: (res) => (res as CoursesResponse).payload,
        });
    }

    courseByUrl(courseUrl: Signal<string>) {
        return httpResource<Course>(() => `/api/courses/${courseUrl()}`);
    }

    lessonsSummary(courseUrl: Signal<string>) {
        return httpResource<LessonSummary[]>(() => ({
            url: '/api/lessons',
            params: {pageSize: '10000', courseUrl: courseUrl()},
        }), {
            parse: (res) => (res as LessonsResponse).payload,
        });
    }

    lessonDetail(courseUrl: Signal<string>, lessonSeqNo: Signal<string>) {
        return httpResource<LessonDetail>(() => ({
            url: '/api/lesson-details',
            params: {courseUrl: courseUrl(), lessonSeqNo: lessonSeqNo()},
        }));
    }

    searchLessons(search: Signal<string>) {
        return httpResource<LessonSummary[]>(() => ({
            url: '/api/lessons',
            params: {filter: search(), pageSize: '100'},
        }), {
            parse: (res) => (res as LessonsResponse).payload,
        });
    }

    async saveCourse(courseId: string, changes: Partial<Course>) {
        await firstValueFrom(this.http.put(`/api/courses/${courseId}`, changes));
    }
}
