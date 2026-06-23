import {inject} from '@angular/core';
import {CanMatchFn, Router} from '@angular/router';
import {AuthService} from './auth.service';

export const canMatchAuth: CanMatchFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
