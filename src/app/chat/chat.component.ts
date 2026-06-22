import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButton, RouterLink]
})
export class ChatComponent implements OnInit {
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
  }

}
