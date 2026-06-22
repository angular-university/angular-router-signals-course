import { Component, Input, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import {LessonSummary} from "../model/lesson-summary";

@Component({
    selector: 'lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink]
})
export class LessonsListComponent implements OnInit {
  private route = inject(ActivatedRoute);


  lessons:LessonSummary[];

  ngOnInit() {

    this.lessons = this.route.snapshot.data["lessons"];

  }

}
