import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private loginServices: LoginService
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    login: new FormControl('')
  })
  
  onSubmit() {
    this.loginServices.getLogin(this.loginForm.value.login).subscribe((data) => {
      console.log(data)
    })
  }

}
