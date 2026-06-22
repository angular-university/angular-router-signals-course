import {Component, ChangeDetectionStrategy, inject, signal, effect} from '@angular/core';
import {MessagesService} from './messages.service';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIcon]
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
