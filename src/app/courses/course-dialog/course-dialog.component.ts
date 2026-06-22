import {Component, ChangeDetectionStrategy, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions} from '@angular/material/dialog';
import {Course} from '../model/course';
import {form, FormField, submit, required} from '@angular/forms/signals';
import {CoursesService} from '../services/courses.service';
import {firstValueFrom} from 'rxjs';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {MessagesComponent} from '../../shared/messages/messages.component';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogTitle, LoadingComponent, MessagesComponent, CdkScrollable,
        MatDialogContent, FormField, MatFormField, MatLabel, MatInput,
        MatSelect, MatOption, MatDialogActions, MatButton
    ]
})
export class CourseDialogComponent {
    private dialogRef = inject<MatDialogRef<CourseDialogComponent>>(MatDialogRef);
    private coursesService = inject(CoursesService);
    protected readonly course = inject<Course>(MAT_DIALOG_DATA);

    protected readonly model = signal({
        description: this.course.description || '',
        category: this.course.category || '',
        releasedAt: new Date().toISOString().split('T')[0],
        longDescription: this.course.longDescription || '',
    });

    protected readonly courseForm = form(this.model, (s) => {
        required(s.description, {message: 'Description is required'});
        required(s.category, {message: 'Category is required'});
        required(s.longDescription, {message: 'Long description is required'});
    });

    save() {
        submit(this.courseForm, async () => {
            const changes = this.model();
            await firstValueFrom(this.coursesService.saveCourse(this.course.id, changes));
            this.dialogRef.close(changes);
        });
    }

    close() {
        this.dialogRef.close();
    }
}
