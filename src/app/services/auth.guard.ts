import {inject} from '@angular/core';
import {CanActivateFn, CanActivateChildFn, Router} from '@angular/router';
import {AuthStore} from './auth.store';

const checkAuthenticated = () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
    return auth.isLoggedIn() ? true : router.parseUrl('/login');
};

export const authGuard: CanActivateFn = () => checkAuthenticated();
export const authGuardChild: CanActivateChildFn = () => checkAuthenticated();
