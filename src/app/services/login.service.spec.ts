import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { loginMock } from './login.mock';

import { LoginService } from './login.service';
import { catchError, retry } from 'rxjs/operators';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  const textOnInputMock = 'agapox';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of users', () => {
    service.getLogin(textOnInputMock).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data).toBe(usersResponse)
      expect(data.total_count).toBe(2)
      expect(data).toBe(usersResponse)
      expect(data.items[0].login).toBe('agapox')
    });

    const usersResponse = loginMock;
    const req = httpMock.expectOne({
      method: "GET",
      url: `https://api.github.com/search/users?q=${textOnInputMock}`
    });
  
    req.flush(usersResponse);
  
    httpMock.verify();
  })


  it('should set searched text', () => {
    const text = 'hola';
    const spy = spyOn(service['searchedText$'], 'next')
    service.setSearchedText(text)
    expect(spy).toHaveBeenCalled()
  });

  it('should get searched text', () => {
    const text = 'hola';
    const spy = spyOn(service['searchedText$'], 'next')
    service.setSearchedText(text)
    expect(spy).toHaveBeenCalled()
    service.getSearchedText().subscribe(data => {
      expect(data).toBe(text)
    })
  });

  it('should handleError', () => {
    const errorResponse = new HttpErrorResponse({
      error: { code: `400`, message: `Error: please try again later.` },
      status: 400,
      statusText: 'Bad Request',
    });

    service.getLogin(textOnInputMock).subscribe(
      () => {
        fail('the getLogin should have fail')
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(400)
      }
    )

    const req = httpMock.expectOne({
      method: "GET",
      url: `https://api.github.com/search/users?q=${textOnInputMock}`
    });

    req.flush(errorResponse);
  
    httpMock.verify();

  });

  it('should handle error from request', () => {
    const errorResponse = new HttpErrorResponse({
      error: { code: `400`, message: `Error: please try again later.` },
      status: 400,
      statusText: 'Bad Request',
    });

    const handle = service['handleError'](errorResponse)

    expect(handle).toBeInstanceOf(ErrorEvent)
    expect(handle).toBe(errorResponse.error)
  })

});

