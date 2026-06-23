import {Component, inject, input, effect} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
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

    private routerEvent = toSignal(this.router.events);

    constructor() {
        effect(() => {
            if (!this.detectRoutingOngoing()) return;
            const event = this.routerEvent();
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
