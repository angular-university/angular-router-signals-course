import {inject} from '@angular/core';
import {CanDeactivateFn} from '@angular/router';
import {ConfirmDialogService} from '../shared/confirm-dialog/confirm-dialog.service';
import {ConfirmRouteExit} from '../shared/confirm-dialog/confirm-route-exit';

export const confirmExitGuard: CanDeactivateFn<ConfirmRouteExit> = (component) => {
    if (!component.hasUnsavedChanges()) return true;
    return inject(ConfirmDialogService).confirm('You have unsaved changes. Leave anyway?');
};
