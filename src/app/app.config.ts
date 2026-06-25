import {ApplicationConfig, inject, provideZonelessChangeDetection} from '@angular/core';
import {
  NavigationError,
  provideRouter,
  RedirectCommand,
  Router,
  withComponentInputBinding, withDebugTracing,
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
            withRouterConfig({
                paramsInheritanceStrategy: 'always',
                //onSameUrlNavigation: 'reload',
                // defaultQueryParamsHandling: 'preserve' — sets a global default for all navigations
            }),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
            withViewTransitions(),
            withNavigationErrorHandler((error: NavigationError) => {
                console.error('Navigation error:', error);
                const router = inject(Router);
                return new RedirectCommand(router.parseUrl('/page-not-found'));
            }),
          // withDebugTracing()
        ),
        provideHttpClient(withInterceptorsFromDi()),
    ]
};
