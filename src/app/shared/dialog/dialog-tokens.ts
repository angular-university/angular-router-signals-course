import {InjectionToken} from '@angular/core';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

export class DialogRef<R = any> {
    constructor(private readonly _closeFn: (result?: R) => void) {}
    close(result?: R): void {
        this._closeFn(result);
    }
}
