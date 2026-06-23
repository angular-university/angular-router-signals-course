import {Service, inject, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom, map} from 'rxjs';
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

    // Observable versions for use in resolvers (one-shot, not reactive)
    loadCourseByUrl(courseUrl: string) {
        return this.http.get<Course>(`/api/courses/${courseUrl}`);
    }

    loadAllCourseLessonsSummary(courseUrl: string) {
        return this.http.get<{payload: LessonSummary[]}>('/api/lessons', {
            params: {pageSize: '10000', courseUrl},
        }).pipe(map(res => res.payload));
    }

    loadLessonDetail(courseUrl: string, lessonSeqNo: string) {
        return this.http.get<LessonDetail>('/api/lesson-details', {
            params: {courseUrl, lessonSeqNo},
        });
    }

    async saveCourse(courseId: string, changes: Partial<Course>) {
        await firstValueFrom(this.http.put(`/api/courses/${courseId}`, changes));
    }
}
