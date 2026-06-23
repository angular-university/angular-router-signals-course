import {
    Service,
    inject,
    createComponent,
    EnvironmentInjector,
    ApplicationRef,
    Type,
    Injector,
} from '@angular/core';
import {DIALOG_DATA, DialogRef} from './dialog-tokens';

export interface DialogConfig<D = any> {
    data?: D;
    width?: string;
}

@Service()
export class DialogService {
    private readonly appRef = inject(ApplicationRef);
    private readonly envInjector = inject(EnvironmentInjector);

    open<T, D = any, R = any>(component: Type<T>, config: DialogConfig<D> = {}): Promise<R | undefined> {
        return new Promise<R | undefined>(resolve => {
            const overlay = document.createElement('div');
            overlay.className = 'au-dialog-overlay';

            const closeFn = (result?: R) => {
                resolve(result);
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
        });
    }
}
