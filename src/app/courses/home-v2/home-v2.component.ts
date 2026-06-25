import {Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {sortCoursesBySeqNo} from '../model/course';
import {CoursesService} from '../services/courses.service';

@Component({
    selector: 'home-v2',
    templateUrl: './home-v2.component.html',
    styleUrls: ['./home-v2.component.css'],
    imports: [],
})
export class HomeV2Component {
    private readonly coursesService = inject(CoursesService);
    private readonly coursesResource = this.coursesService.allCourses();

    readonly courses = computed(() =>
        [...(this.coursesResource.value() ?? [])].sort(sortCoursesBySeqNo)
    );
}
