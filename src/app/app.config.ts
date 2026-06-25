import {ApplicationConfig, inject, provideZonelessChangeDetection} from '@angular/core';
import {
    NavigationError,
    provideRouter,
    RedirectCommand,
    Router,
    withComponentInputBinding,
    withInMemoryScrolling,
    withNavigationErrorHandler,
    withPreloading,
    withRouterConfig,
    withViewTransitions,
} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {routes} from './app.routes';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withPreloading(CustomPreloadingStrategy),
            withRouterConfig({paramsInheritanceStrategy: 'always'}),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
            withViewTransitions(),
            withNavigationErrorHandler((error: NavigationError) => {
                console.error('Navigation error:', error);
                const router = inject(Router);
                return new RedirectCommand(router.parseUrl('/page-not-found'));
            }),
        ),
        provideHttpClient(withInterceptorsFromDi()),
    ]
};
