import {Component, input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Course} from '../model/course';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet],
})
export class CourseComponent {
    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    confirmExit() {
        return confirm(`Are you sure you want to exit ${this.course().description}?`);
    }
}
