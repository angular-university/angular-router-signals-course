import {Component, computed, effect, inject, input, OnDestroy, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Course} from '../model/course';
import {LessonProgressService} from '../services/lesson-progress.service';

export type CaptionsConfig = {captionsEnabled: boolean};

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
  providers: [LessonProgressService],
  imports: [
    RouterOutlet,
    RouterLink
  ],
})
export class CourseComponent implements OnDestroy {

    readonly course = input.required<Course>();
    readonly couponCode = input<string>();

    private readonly title = inject(Title);
    protected readonly progress = inject(LessonProgressService);

    protected readonly captionsEnabled = signal(false);

    protected readonly captionsConfig = computed<CaptionsConfig>(() => ({
      captionsEnabled: this.captionsEnabled()
    }))


    protected readonly progressPercent = computed(() =>
        Math.round((this.progress.visitedCount() / this.course().lessonsCount) * 100)
    );

    constructor() {
        console.log('[Course] created');
        effect(() => {
            const course = this.course();
            this.title.setTitle(course.description);
            this.progress.initialize(course.url);
        });
    }





    ngOnDestroy() {
        console.log('[Course] destroyed');
    }
}
