import {UrlMatcher, UrlSegment} from '@angular/router';

/**
 * Matches a course page under two different URL shapes, both mapping to the
 * same `courseUrl` route parameter:
 *
 *   - the modern URL:   /:courseUrl                    (e.g. /angular-course)
 *   - the legacy URL:   /legacy-course-page/:courseUrl (e.g. /legacy-course-page/angular-course)
 *
 * This is the kind of thing the plain `path` syntax can't express in a single
 * route: without a matcher we'd need two separate route entries duplicating the
 * component, resolvers, guards and children.
 */
export const coursePageMatcher: UrlMatcher = (url: UrlSegment[]) => {
    // Modern URL: a single segment -> /:courseUrl
    if (url.length === 1) {
        return {consumed: url, posParams: {courseUrl: url[0]}};
    }

    // Legacy URL: /legacy-course-page/:courseUrl
    if (url.length === 2 && url[0].path === 'legacy-course-page') {
        return {consumed: url, posParams: {courseUrl: url[1]}};
    }

    return null;
};
