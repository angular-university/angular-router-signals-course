import {UrlMatcher, UrlSegment} from '@angular/router';

export const coursePageMatcher: UrlMatcher = (url: UrlSegment[]) => {
    if (url.length !== 1) return null;
    const path = url[0].path;
    const isId = /^\d+$/.test(path);
    const isSlug = /^[a-z0-9-]+$/.test(path);
    if (!isId && !isSlug) return null;
    return {consumed: url, posParams: {courseUrl: url[0]}};
};
