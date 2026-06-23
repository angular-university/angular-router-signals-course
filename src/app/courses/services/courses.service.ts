import {Service, inject, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course} from '../model/course';
import {LessonDetail} from '../model/lesson-detail';
import {LessonSummary} from '../model/lesson-summary';

@Service()
export class CoursesService {
    private http = inject(HttpClient);

    allCourses() {
        return httpResource<Course[]>(() => '/api/courses', {
            parse: (res: any) => res.payload as Course[],
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
            parse: (res: any) => res.payload as LessonSummary[],
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
            parse: (res: any) => res.payload as LessonSummary[],
        });
    }

    async saveCourse(courseId: string, changes: Partial<Course>) {
        await firstValueFrom(this.http.put(`/api/courses/${courseId}`, changes));
    }
}
