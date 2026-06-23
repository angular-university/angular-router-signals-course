import {Component, inject, input, output} from '@angular/core';
import {Course} from '../model/course';
import {DialogService} from '../../shared/dialog/dialog.service';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    imports: [RouterLink],
})
export class CoursesCardListComponent {
    private dialog = inject(DialogService);

    readonly courses = input<Course[]>([]);
    readonly coursesChanged = output();

    async editCourse(course: Course) {
        const result = await this.dialog.open(CourseDialogComponent, {
            data: course,
            width: '480px',
        });
        if (result) {
            this.coursesChanged.emit();
        }
    }
}
