import {inject} from '@angular/core';
import {CanActivateFn, CanActivateChildFn, RedirectCommand, Router} from '@angular/router';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = () => true;
export const authGuardChild: CanActivateChildFn = () => true;
