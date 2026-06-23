import {Service, signal, computed} from '@angular/core';

@Service()
export class MessagesService {
    private readonly _errors = signal<string[]>([]);
    readonly errors = computed(() => this._errors().filter(e => e && e.length > 0));

    showErrors(...errors: string[]) {
        this._errors.set(errors);
    }
}
