import {Service, signal} from '@angular/core';

@Service()
export class ConfirmDialogService {
    readonly isOpen = signal(false);
    readonly message = signal('');
    private resolve: ((value: boolean) => void) | null = null;

    confirm(message: string): Promise<boolean> {
        this.message.set(message);
        this.isOpen.set(true);
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }

    answer(confirmed: boolean) {
        this.isOpen.set(false);
        this.resolve?.(confirmed);
        this.resolve = null;
    }
}
