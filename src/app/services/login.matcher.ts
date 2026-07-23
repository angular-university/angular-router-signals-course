import {UrlMatcher, UrlSegment} from '@angular/router';

export const loginMatcher: UrlMatcher = (url: UrlSegment[]) => {
    const aliases = new Set(['login', 'signin', 'sign-in']);
    if (url.length === 1 && aliases.has(url[0].path)) {
        return {consumed: url};
    }
    return null;
};
