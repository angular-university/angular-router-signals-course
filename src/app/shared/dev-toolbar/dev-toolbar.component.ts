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
    }

    async demoError() {
        try {
            const ok = await this.router.navigateByUrl('/fail');
            console.log('[boom] RESOLVED with', ok);
        } catch (e) {
            console.log('[boom] REJECTED', e);
        }
    }
}
