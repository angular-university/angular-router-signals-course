import {Component, computed, effect, inject, input, linkedSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {form, FormField, required} from '@angular/forms/signals';
import {Course} from '../model/course';
import {ConfirmRouteExit} from '../../shared/confirm-dialog/confirm-route-exit';
import {LessonProgressService} from '../services/lesson-progress.service';

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

    private readonly title = inject(Title);
    protected readonly progress = inject(LessonProgressService);

    protected readonly progressPercent = computed(() =>
        Math.round((this.progress.visitedCount() / this.course().lessonsCount) * 100)
    );

    constructor() {
        effect(() => {
            const course = this.course();
            this.title.setTitle(course.description);
            this.progress.initialize(course.url);
        });
    }

    hasUnsavedChanges() {
        return this.form.title().dirty();
    }
}
