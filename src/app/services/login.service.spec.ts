import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { loginMock } from './login.mock';

import { LoginService } from './login.service';

fdescribe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

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
    const textOnInputMock = 'agapox';
    expect(service).toBeTruthy();
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


  it('should console error if failed', () => {
    
  });

});
