import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {
    provideRouter,
    TitleStrategy,
    withComponentInputBinding,
    withDebugTracing,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
    withViewTransitions,
} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {routes} from './app.routes';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';
import {AppTitleStrategy} from './services/app-title.strategy';

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
            withDebugTracing(),
        ),
        provideHttpClient(withInterceptorsFromDi()),
        {provide: TitleStrategy, useExisting: AppTitleStrategy},
    ]
};
