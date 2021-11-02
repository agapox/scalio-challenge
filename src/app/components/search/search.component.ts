import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() textSeachedEv: EventEmitter<string> = new EventEmitter<string>();
  
  loginForm = new FormGroup({
    login: new FormControl('')
  })

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  
  onSubmit() {
    this.loginService.setSearchedText(this.loginForm.value.login)
  }

}
