import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  currentPage: number = 1;
  @Input() text = '';
  items: any[] = [];
  incomplete: boolean = true;
  totalCount: number = 0;
  pages: number = 1;
  failedRequest = {
    failed: false,
    counter: 0,
    message: ''  
  }

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getTextSearched()
  }

  resetVars() {
    this.items = [];
    this.incomplete = true;
    this.totalCount = 0;
    this.pages = 1;
  }

  getTextSearched() {
    this.resetVars()
    this.loginService.getSearchedText().subscribe(data => {
      this.text = data;
      console.log(this.text)
      this.getUsers()
    })
  }

  getUsers(page: number = 1) {
    if (this.text !== '') {
      this.loginService.getLogin(this.text, page).subscribe(data => {
        console.log(data)
        this.items = data.items
        this.incomplete = data.incomplete_results
        this.totalCount = data.total_count
        this.pages = Math.floor(this.totalCount/9 + 1) > 1 ? Math.floor(this.totalCount/9 + 1) : 1
      },
      (err) => {
        this.failedRequest.failed = true
        this.failedRequest.counter++
        this.failedRequest.message = this.failedRequest.counter > 3 ? 'Oops we have some troubles making your request. Please try again in 5 minutes' : 'Oops we have some troubles making your request. Please try again.'
      })
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getUsers(this.currentPage)
  }

  nextPage() {
    this.currentPage+=1;
    this.getUsers(this.currentPage)
  }
  previousPage() {
    this.currentPage-=1;
    this.getUsers(this.currentPage)
  }


}
