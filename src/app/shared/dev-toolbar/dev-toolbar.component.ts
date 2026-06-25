import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FeatureFlagService} from '../../services/feature-flag.service';

@Component({
    selector: 'dev-toolbar',
    templateUrl: './dev-toolbar.component.html',
    styleUrls: ['./dev-toolbar.component.css'],
})
export class DevToolbarComponent {
    protected readonly flags = inject(FeatureFlagService);
    private readonly router = inject(Router);

    async toggle(flag: string) {
        await this.flags.toggle(flag);
        this.router.navigateByUrl(this.router.url);
    }
}
