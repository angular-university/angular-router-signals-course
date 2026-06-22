import {inject} from '@angular/core';
import {CanMatchFn, Router} from '@angular/router';
import {AuthStore} from './auth.store';

export const canMatchAuth: CanMatchFn = () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
    return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
