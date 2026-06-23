import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthStore} from './services/auth.store';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessagesComponent} from './shared/messages/messages.component';
import {LoadingComponent} from './shared/loading/loading.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MessagesComponent,
        LoadingComponent,
    ],
})
export class AppComponent {
    readonly auth = inject(AuthStore);

    logout() {
        this.auth.logout();
    }
}
