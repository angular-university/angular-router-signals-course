import {Component, inject, input, output, signal} from '@angular/core';
import {Course} from '../model/course';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    imports: [RouterLink, CourseDialogComponent],
})
export class CoursesCardListComponent {
    readonly courses = input<Course[]>([]);
    readonly coursesChanged = output();

    readonly editingCourse = signal<Course | null>(null);

    editCourse(course: Course) {
        this.editingCourse.set(course);
    }

    onDialogClosed(saved: boolean) {
        this.editingCourse.set(null);
        if (saved) this.coursesChanged.emit();
    }
}
