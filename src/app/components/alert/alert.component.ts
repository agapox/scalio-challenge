import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() type: 'info' | 'warning' | 'danger' = 'warning';

  @Input() message: string = '';

  icon = {
    info: 'fas fa-info',
    warning: 'fas fa-exclamation-triangle',
    danger: 'fas fa-radiation'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
