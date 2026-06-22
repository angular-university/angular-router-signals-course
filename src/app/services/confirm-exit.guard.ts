import {CanDeactivateFn} from '@angular/router';
import {CourseComponent} from '../courses/course/course.component';

export const confirmExitGuard: CanDeactivateFn<CourseComponent> = (component) => {
    return component.confirmExit();
};
