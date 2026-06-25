import {inject} from '@angular/core';
import {CanDeactivateFn, Router} from '@angular/router';
import {ConfirmDialogService} from '../shared/confirm-dialog/confirm-dialog.service';
import {ConfirmRouteExit} from '../shared/confirm-dialog/confirm-route-exit';

export const confirmExitGuard: CanDeactivateFn<ConfirmRouteExit> = () => true;
