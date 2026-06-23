import {
    Service,
    inject,
    createComponent,
    EnvironmentInjector,
    ApplicationRef,
    Type,
    Injector,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DIALOG_DATA, DialogRef} from './dialog-tokens';

export interface DialogConfig<D = any> {
    data?: D;
    width?: string;
}

export interface DialogHandle<R = any> {
    afterClosed(): Observable<R | undefined>;
}

@Service()
export class DialogService {
    private readonly appRef = inject(ApplicationRef);
    private readonly envInjector = inject(EnvironmentInjector);

    open<T, D = any, R = any>(component: Type<T>, config: DialogConfig<D> = {}): DialogHandle<R> {
        const subject = new Subject<R | undefined>();

        const overlay = document.createElement('div');
        overlay.className = 'au-dialog-overlay';

        const closeFn = (result?: R) => {
            subject.next(result);
            subject.complete();
            componentRef.destroy();
            overlay.remove();
        };

        const dialogRef = new DialogRef<R>(closeFn);

        const componentRef = createComponent(component as Type<any>, {
            environmentInjector: this.envInjector,
            elementInjector: Injector.create({
                providers: [
                    {provide: DIALOG_DATA, useValue: config.data ?? null},
                    {provide: DialogRef, useValue: dialogRef},
                ],
                parent: this.envInjector,
            }),
        });

        if (config.width) {
            (componentRef.location.nativeElement as HTMLElement).style.setProperty(
                '--dialog-width',
                config.width,
            );
        }

        overlay.appendChild(componentRef.location.nativeElement);
        document.body.appendChild(overlay);
        this.appRef.attachView(componentRef.hostView);

        return {afterClosed: () => subject.asObservable()};
    }
}
