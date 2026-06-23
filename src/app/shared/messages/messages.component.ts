import {Component, inject, signal, effect} from '@angular/core';
import {MessagesService} from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    imports: [],
})
export class MessagesComponent {
    private messagesService = inject(MessagesService);

    readonly showMessages = signal(false);
    readonly errors = this.messagesService.errors;

    constructor() {
        effect(() => {
            if (this.errors().length > 0) {
                this.showMessages.set(true);
            }
        });
    }

    onClose() {
        this.showMessages.set(false);
    }
}
