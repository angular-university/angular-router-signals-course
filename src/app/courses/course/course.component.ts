import {Component, computed, effect, inject, input} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Course} from '../model/course';
import {LessonProgressService} from '../services/lesson-progress.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet, RouterLink],
})
export class CourseComponent {
    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

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
}
