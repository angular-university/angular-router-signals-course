import {Component, input, computed} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LessonDetail} from '../model/lesson-detail';
@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
    imports: [RouterLink],
})
export class LessonDetailComponent {
    readonly lesson = input<LessonDetail>();
    readonly courseUrl = input<string>();

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
