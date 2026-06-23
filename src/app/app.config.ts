import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withPreloading, withRouterConfig, withInMemoryScrolling, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {APP_ROUTES} from './app.routes';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(
            APP_ROUTES,
            withComponentInputBinding(),
            withPreloading(CustomPreloadingStrategy),
            withRouterConfig({paramsInheritanceStrategy: 'always'}),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
        ),
        provideHttpClient(withInterceptorsFromDi()),
        CustomPreloadingStrategy,
    ]
};
