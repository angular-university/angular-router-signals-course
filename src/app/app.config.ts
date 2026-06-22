import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, withPreloading, withRouterConfig, withInMemoryScrolling} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {APP_ROUTES} from './app.routes';
import {CustomPreloadingStrategy} from './services/custom-preloading.strategy';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(
            APP_ROUTES,
            withPreloading(CustomPreloadingStrategy),
            withRouterConfig({paramsInheritanceStrategy: 'always'}),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        CustomPreloadingStrategy,
    ]
};
