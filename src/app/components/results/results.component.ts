import { Component, OnInit } from '@angular/core';
import { loginMock } from 'src/app/services/login.mock';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  loginItems = loginMock.items;

  constructor() { }

  ngOnInit(): void {
    console.log(this.loginItems)
  }

}
