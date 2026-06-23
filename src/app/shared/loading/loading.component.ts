import {Component, OnInit, ChangeDetectionStrategy, inject, input} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class LoadingComponent implements OnInit {
    private loadingService = inject(LoadingService);
    private router = inject(Router);

    readonly detectRoutingOngoing = input(false);
    readonly loading = this.loadingService.loading;

    ngOnInit() {
        if (this.detectRoutingOngoing()) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
                    this.loadingService.loadingOn();
                } else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationError ||
                    event instanceof NavigationCancel ||
                    event instanceof RouteConfigLoadEnd
                ) {
                    this.loadingService.loadingOff();
                }
            });
        }
    }
}
