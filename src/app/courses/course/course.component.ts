import {Component, inject, input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Course} from '../model/course';
import {ConfirmDialogService} from '../../shared/confirm-dialog/confirm-dialog.service';
import {CanComponentDeactivate} from '../../shared/confirm-dialog/can-component-deactivate';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet],
})
export class CourseComponent implements CanComponentDeactivate {
    private confirmDialog = inject(ConfirmDialogService);

    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    async canDeactivate(): Promise<boolean> {
        return this.confirmDialog.confirm(`Leave ${this.course().description}?`);
    }
}
