import {Component, inject} from '@angular/core';
import {ConfirmDialogService} from './confirm-dialog.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
    protected readonly confirmDialog = inject(ConfirmDialogService);
}
