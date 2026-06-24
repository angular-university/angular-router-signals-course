import {Component, input, linkedSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Course} from '../model/course';
import {ConfirmRouteExit} from '../../shared/confirm-dialog/confirm-route-exit';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet],
})
export class CourseComponent implements ConfirmRouteExit {
    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    protected readonly titleModel = linkedSignal(() => this.course().description);

    hasUnsavedChanges(): boolean {
        return this.titleModel() !== this.course().description;
    }

    protected onTitleInput(event: Event) {
        this.titleModel.set((event.target as HTMLInputElement).value);
    }
}
