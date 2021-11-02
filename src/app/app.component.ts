import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scalio-challenge';

  text: string = '';

  constructor() { }

  ngOnInit() {

  }

  getTextSearch(text: string) {
    console.log(text)
    this.text = text
  }
  
}
