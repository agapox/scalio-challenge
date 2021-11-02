import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginHttpResInterface } from '../interfaces/LoginHttpRes.interface';
// import { Character, CharactersHttp } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private APIURL: string = 'https://api.github.com/search/users?q=';
  private searchedText$: Subject<string> = new Subject()
  
  constructor(
    private httpClient: HttpClient,
  ) {}

  setSearchedText(text: string) {
    this.searchedText$.next(text);
  }

  getSearchedText(): Observable<string> {
    return this.searchedText$.asObservable();
  }

  getLogin(login: string, page: number = 1): Observable<LoginHttpResInterface | any> {
    return this.httpClient.get<LoginHttpResInterface>(`${this.APIURL}${login}&per_page=9&page=${page}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.status);
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body: ${error.error}`);
    }
    return throwError(
      'Error: please try again later.');
  }
  
}