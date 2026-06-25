import {Component, effect, inject, input, OnDestroy, Signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, ROUTER_OUTLET_DATA} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LessonDetail} from '../model/lesson-detail';
import {LessonProgressService} from '../services/lesson-progress.service';
import {CourseOutletData} from '../course/course.component';

@Component({
    selector: 'lesson',
    templateUrl: './lesson-detail.component.html',
    styleUrls: ['./lesson-detail.component.css'],
    imports: [RouterLink],
})
export class LessonDetailComponent implements OnDestroy {
    private readonly title = inject(Title);
    private readonly progress = inject(LessonProgressService);
    protected readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    protected readonly outletData = inject(ROUTER_OUTLET_DATA) as Signal<CourseOutletData>;

    readonly lesson = input<LessonDetail>();
    readonly courseUrl = input<string>();

    constructor() {
        console.log('[LessonDetail] created');
        effect(() => {
            const lesson = this.lesson();
            if (lesson) {
                this.title.setTitle(lesson.description);
                this.progress.markVisited(lesson.seqNo);
            }
        });
    }

    // onSameUrlNavigation per-navigation: re-runs guards and resolvers on same URL
    reloadLesson() {
        this.router.navigateByUrl(this.router.url, {onSameUrlNavigation: 'reload'});
    }

    ngOnDestroy() {
        console.log('[LessonDetail] destroyed');
    }
}
