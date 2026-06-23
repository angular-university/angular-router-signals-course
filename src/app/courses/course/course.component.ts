import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {Course} from '../model/course';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    imports: [RouterOutlet]
})
export class CourseComponent implements OnInit {
  private route = inject(ActivatedRoute);


  course:Course;

  couponCode:string;


  ngOnInit() {

      this.course = this.route.snapshot.data["course"];

      this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");

  }

  confirmExit() {
      return confirm(`Are you sure you want to exit ${this.course.description}?`)
  }


}











