import {Component, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs';
import {LoadingService} from './loading.service';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router,
} from '@angular/router';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
    imports: [],
})
export class LoadingComponent {
    private loadingService = inject(LoadingService);

    readonly detectRoutingOngoing = input(false);
    readonly loading = this.loadingService.loading;
}
