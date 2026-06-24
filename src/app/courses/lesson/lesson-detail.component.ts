import {Component, computed, effect, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LessonDetail} from '../model/lesson-detail';
@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
    imports: [RouterLink],
})
export class LessonDetailComponent {
    private readonly title = inject(Title);

    readonly lesson = input<LessonDetail>();
    readonly courseUrl = input<string>();

    constructor() {
        effect(() => {
            const lesson = this.lesson();
            if (lesson) this.title.setTitle(lesson.description);
        });
    }

    readonly prevLessonLink = computed(() => {
        const lesson = this.lesson();
        return lesson && !lesson.first
            ? ['/courses', this.courseUrl(), 'lessons', lesson.seqNo - 1]
            : null;
    });

    readonly nextLessonLink = computed(() => {
        const lesson = this.lesson();
        return lesson && !lesson.last
            ? ['/courses', this.courseUrl(), 'lessons', lesson.seqNo + 1]
            : null;
    });
}
