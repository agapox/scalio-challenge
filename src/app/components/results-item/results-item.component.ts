import { Component, Input, OnInit } from '@angular/core';
import { LoginInterface } from 'src/app/interfaces/Login.interface';

@Component({
  selector: 'app-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss']
})
export class ResultsItemComponent implements OnInit {

  @Input() item: LoginInterface | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
