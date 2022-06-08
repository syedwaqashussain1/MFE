import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorInterceptor implements ErrorHandler {
  private baseUrl = environment.apiBase;
  constructor(public http: HttpClient, private injector: Injector) {}

  handleError(error) {
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    console.log(error);

    StackTrace.fromError(error).then(stackframes => {
      const stackString = stackframes
        .splice(0, 20)
        .map(function(sf) {
          return sf.toString();
        }).join('\n');
      /*this.http.post(this.baseUrl + 'api/general/error-logging/client', {
        url,
        message,
        stack: stackString
      }).subscribe((response) => {
        const matches = message.toLowerCase().match(new RegExp('loading chunk ([0-9]+) failed', 'g'))
        if (matches && matches.length > 0) {
          window.location.reload();
        }
      });*/
      const matches = message.toLowerCase().match(new RegExp('loading chunk ([0-9]+) failed', 'g'))
      if (matches && matches.length > 0) {
        window.location.reload();
      }
      throw {type: 'Global Error Handler',  message, url, stack: stackString };
    });
  }
}
