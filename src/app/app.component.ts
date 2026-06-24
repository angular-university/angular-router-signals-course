import {Component, inject} from '@angular/core';
import {AuthService} from './services/auth.service';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessagesComponent} from './shared/messages/messages.component';
import {LoadingComponent} from './shared/loading/loading.component';
import {ConfirmDialogComponent} from './shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MessagesComponent,
        LoadingComponent,
        ConfirmDialogComponent,
    ],
})
export class AppComponent {
    readonly auth = inject(AuthService);

    logout() {
        this.auth.logout();
    }
}
