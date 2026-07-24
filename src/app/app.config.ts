import {ApplicationConfig, inject, provideZonelessChangeDetection} from '@angular/core';
import {
  NavigationError, NoPreloading, PreloadAllModules,
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
      provideRouter(
        routes,
        withRouterConfig({
          defaultQueryParamsHandling: 'merge'
        }),
        withComponentInputBinding(),
        withPreloading(CustomPreloadingStrategy),
      ),
      provideZonelessChangeDetection(),
      provideHttpClient(withInterceptorsFromDi()),
    ]
};

