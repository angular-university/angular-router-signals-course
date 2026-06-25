import {inject} from '@angular/core';
import {ResolveFn, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Course} from '../model/course';

export const courseResolver: ResolveFn<Course> = async (route) => {
    return null!;
};
