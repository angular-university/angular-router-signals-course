import {Injectable, signal} from '@angular/core';
import {Observable, of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
    private readonly _loading = signal(false);
    readonly loading = this._loading.asReadonly();

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.loadingOn()),
            concatMap(() => obs$),
            finalize(() => this.loadingOff())
        );
    }

    loadingOn() {
        this._loading.set(true);
    }

    loadingOff() {
        this._loading.set(false);
    }
}
