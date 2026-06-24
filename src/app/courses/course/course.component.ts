import {Component, input, linkedSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {form, FormField, required} from '@angular/forms/signals';
import {Course} from '../model/course';
import {ConfirmRouteExit} from '../../shared/confirm-dialog/confirm-route-exit';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet, RouterLink, FormField],
})
export class CourseComponent implements ConfirmRouteExit {
    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    protected readonly model = linkedSignal(() => ({title: this.course().description}));

    protected readonly form = form(this.model, (s) => {
        required(s.title, {message: 'Title is required'});
    });

    hasUnsavedChanges() {
        return this.form.title().dirty();
    }
}
