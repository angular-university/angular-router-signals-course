import {Component, inject, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LessonDetail} from '../model/lesson-detail';
import {SafeUrlPipe} from '../../shared/pipes/safe-url.pipe';

@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
    imports: [RouterLink, SafeUrlPipe],
})
export class LessonDetailComponent {
    private router = inject(Router);

    readonly lesson = input<LessonDetail>();
    readonly courseUrl = input<string>();

    previous() {
        const lesson = this.lesson();
        if (lesson) {
            this.router.navigate(['/courses', this.courseUrl(), 'lessons', lesson.seqNo - 1]);
        }
    }

    next() {
        const lesson = this.lesson();
        if (lesson) {
            this.router.navigate(['/courses', this.courseUrl(), 'lessons', lesson.seqNo + 1]);
        }
    }
}
