import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LessonDetail} from '../model/lesson-detail';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {SafeUrlPipe} from '../../shared/pipes/safe-url.pipe';

@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
    imports: [RouterLink, SafeUrlPipe],
})
export class LessonDetailComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    readonly lesson = toSignal<LessonDetail>(
        this.route.data.pipe(map(data => data['lesson'])),
    );

    previous() {
        const lesson = this.lesson();
        if (lesson) {
            this.router.navigate(['lessons', lesson.seqNo - 1], {relativeTo: this.route.parent});
        }
    }

    next() {
        const lesson = this.lesson();
        if (lesson) {
            this.router.navigate(['lessons', lesson.seqNo + 1], {relativeTo: this.route.parent});
        }
    }
}
