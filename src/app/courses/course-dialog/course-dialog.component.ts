import {Component, inject, input, output, linkedSignal} from '@angular/core';
import {Course} from '../model/course';
import {form, FormField, submit, required} from '@angular/forms/signals';
import {CoursesService} from '../services/courses.service';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {MessagesComponent} from '../../shared/messages/messages.component';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    imports: [LoadingComponent, MessagesComponent, FormField],
})
export class CourseDialogComponent {
    private coursesService = inject(CoursesService);

    readonly course = input.required<Course>();
    readonly closed = output<boolean>();

    protected readonly model = linkedSignal(() => ({
        description: this.course().description || '',
        category: this.course().category || '',
        releasedAt: new Date().toISOString().split('T')[0],
        longDescription: this.course().longDescription || '',
    }));

    protected readonly courseForm = form(this.model, (s) => {
        required(s.description, {message: 'Description is required'});
        required(s.category, {message: 'Category is required'});
        required(s.longDescription, {message: 'Long description is required'});
    });

    save() {
        submit(this.courseForm, async () => {
            await this.coursesService.saveCourse(this.course().id, this.model());
            this.closed.emit(true);
        });
    }

    close() {
        this.closed.emit(false);
    }
}
