import {inject} from '@angular/core';
import {CanDeactivateFn, Router} from '@angular/router';
import {ConfirmDialogService} from '../shared/confirm-dialog/confirm-dialog.service';
import {ConfirmRouteExit} from '../shared/confirm-dialog/confirm-route-exit';

export const confirmExitGuard: CanDeactivateFn<ConfirmRouteExit> = (component) => {
  const router = inject(Router);
  const info = router.currentNavigation()?.extras?.info as {skipConfirm?: boolean};
  if (info?.skipConfirm) return true;
  const confirm = inject(ConfirmDialogService);
  if (!component.hasUnsavedChanges()) return true;
  return confirm.confirm('You have unsaved changes. Leave anyway?');
};
