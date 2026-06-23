import {Component, OnInit, inject, input, output} from '@angular/core';
import {Course} from '../model/course';
import {DialogService} from '../../shared/dialog/dialog.service';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter, tap} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    imports: [RouterLink],
})
export class CoursesCardListComponent implements OnInit {
    private dialog = inject(DialogService);

    readonly courses = input<Course[]>([]);
    readonly coursesChanged = output();

    ngOnInit() {}

    editCourse(course: Course) {
        const dialogRef = this.dialog.open(CourseDialogComponent, {
            data: course,
            width: '480px',
        });

        dialogRef.afterClosed()
            .pipe(
                filter(val => !!val),
                tap(() => this.coursesChanged.emit()),
            )
            .subscribe();
    }
}
