import {Service, signal} from '@angular/core';

@Service()
export class LoadingService {
    private readonly _loading = signal(false);
    readonly loading = this._loading.asReadonly();

    loadingOn() {
        this._loading.set(true);
    }

    loadingOff() {
        this._loading.set(false);
    }
}
