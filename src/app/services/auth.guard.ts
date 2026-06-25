import {inject} from '@angular/core';
import {CanActivateFn, CanActivateChildFn, RedirectCommand, Router} from '@angular/router';
import {AuthService} from './auth.service';

const checkAuthenticated = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isLoggedIn()) return true;
    const returnUrl = router.url;
    return new RedirectCommand(router.parseUrl('/login'), {state: {returnUrl}});
};

export const authGuard: CanActivateFn = () => checkAuthenticated();
export const authGuardChild: CanActivateChildFn = () => checkAuthenticated();
