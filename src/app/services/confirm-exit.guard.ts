import {CanDeactivateFn} from '@angular/router';
import {CanComponentDeactivate} from '../shared/confirm-dialog/can-component-deactivate';

export const confirmExitGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    return component.canDeactivate();
};
