import {Component, OnInit, inject, signal, DestroyRef} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {LoadingService} from '../../shared/loading/loading.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CoursesCardListComponent],
})
export class HomeComponent implements OnInit {
    private coursesService = inject(CoursesService);
    private loadingService = inject(LoadingService);
    private destroyRef = inject(DestroyRef);

    readonly courses = signal<Course[]>([]);

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses() {
        this.loadingService.showLoaderUntilCompleted(this.coursesService.loadAllCourses())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(courses => {
                this.courses.set(courses.sort(sortCoursesBySeqNo));
            });
    }
}
