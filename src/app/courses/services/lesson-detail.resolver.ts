import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LessonDetail} from '../model/lesson-detail';

export const lessonDetailResolver: ResolveFn<LessonDetail> = (route) => {
    const courseUrl = route.paramMap.get('courseUrl');
    const lessonSeqNo = route.paramMap.get('lessonSeqNo');
    return inject(HttpClient).get<LessonDetail>('/api/lesson-details', {params: {courseUrl, lessonSeqNo}});
};
