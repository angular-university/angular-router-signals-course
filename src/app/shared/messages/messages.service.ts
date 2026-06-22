import {Injectable, signal, computed} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MessagesService {
    private readonly _errors = signal<string[]>([]);
    readonly errors = computed(() => this._errors().filter(e => e && e.length > 0));

    showErrors(...errors: string[]) {
        this._errors.set(errors);
    }
}
