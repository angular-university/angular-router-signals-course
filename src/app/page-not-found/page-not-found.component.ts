import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject, from
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'about',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    imports: [RouterLink]
})
export class PageNotFoundComponent {


}






