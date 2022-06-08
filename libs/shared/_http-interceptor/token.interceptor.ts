import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //For temporary use just for remove local storage
    // localStorage.clear();

    const roleId = localStorage['roleId'];
    const header = {
      Authorization: `Bearer ${this.auth.getSession('token')}`
    };
    if (roleId) {
      header['roleId'] = roleId;
    }

    header['domain-name'] = request.url;

    request = request.clone({
      setHeaders: header
    });

    return next.handle(request);
  }
}