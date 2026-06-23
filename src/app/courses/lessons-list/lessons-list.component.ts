import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LessonSummary} from '../model/lesson-summary';

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css'],
    imports: [RouterLink],
})
export class LessonsListComponent {
    readonly lessons = input<LessonSummary[]>([]);
}
