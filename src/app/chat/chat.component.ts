import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    imports: [RouterLink],
})
export class ChatComponent implements OnInit {
    private route = inject(ActivatedRoute);

    ngOnInit(): void {}
}
