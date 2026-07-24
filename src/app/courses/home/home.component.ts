import {Component, inject, computed} from '@angular/core';
import {RouterLink} from '@angular/router';
import {sortCoursesBySeqNo} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CoursesCardListComponent, RouterLink],
})
export class HomeComponent {
    private coursesService = inject(CoursesService);

    private coursesResource = this.coursesService.allCourses();

    readonly courses = computed(() =>
        [...(this.coursesResource.value() ?? [])].sort(sortCoursesBySeqNo)
    );

    reloadCourses() {
        this.coursesResource.reload();
    }
}
