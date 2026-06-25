import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {LessonsResponse, LessonSummary} from '../model/lesson-summary';

export const lessonsResolver: ResolveFn<LessonSummary[]> = async (route) => {
    return [];
};
