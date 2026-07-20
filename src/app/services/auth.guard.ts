import {inject} from '@angular/core';
import {CanActivateFn, CanActivateChildFn, RedirectCommand, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

const checkAuthenticated = (state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  const returnUrl = state.url;
  console.log('[authGuard] not authenticated, redirecting to /login with returnUrl:', returnUrl);
  return new RedirectCommand(router.parseUrl('/login'), {state: {returnUrl}});
};

export const authGuard: CanActivateFn = (route, state) => checkAuthenticated(state);

export const authGuardChild: CanActivateChildFn = (childRoute, state) => checkAuthenticated(state);
