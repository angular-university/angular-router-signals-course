import {inject, Service} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

@Service()
export class AppTitleStrategy extends TitleStrategy {
    private readonly title = inject(Title);

    override updateTitle(snapshot: RouterStateSnapshot) {
        const title = this.buildTitle(snapshot);
        this.title.setTitle(
            title ?? 'Angular Router In Depth'
        );
    }
}
