import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LessonSummary} from '../model/lesson-summary';
import {LessonProgressService} from '../services/lesson-progress.service';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css'],
    imports: [RouterLink],
})
export class LessonsListComponent {
    readonly lessons = input<LessonSummary[]>([]);
    protected readonly progress = inject(LessonProgressService);
}
