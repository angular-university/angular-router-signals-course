import {Service} from '@angular/core';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

@Service()
export class AppTitleStrategy extends TitleStrategy {
    override updateTitle(snapshot: RouterStateSnapshot) {
        const title = this.buildTitle(snapshot);
        document.title = title
            ? `${title} — Angular Router In Depth`
            : 'Angular Router In Depth';
    }
}
