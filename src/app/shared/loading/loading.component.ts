import {Component, inject, input} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
    private router = inject(Router);

    readonly detectRoutingOngoing = input(false);
    readonly loading = this.loadingService.loading;

    constructor() {
        this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
            if (!this.detectRoutingOngoing()) return;
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
