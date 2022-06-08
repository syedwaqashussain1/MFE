import {Injectable} from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

import {AuthService} from './auth.service';
import {EncryptionService} from './encryption.service';
import {TemplateService} from './template.service';
import * as moment from 'moment';
import {Subject} from 'rxjs';

@Injectable()
export class ApiService {
  static requestCounter = 0;
  static responseCounter = 0;
  @BlockUI() blockUI: NgBlockUI;
  showLoader = true;
  public baseUrl = environment.apiBase;
  private cronsApi = environment.cronsApi;
  public url: string;
  public aRequest: any[] = [];

  public static defaultBlockUI: Subject<boolean> = new Subject();
  public static lockScreenTimeOut: any;
  /* In milli second */
  /* 1 sec = 1000 millisecond */
  public static lockScreenDefaultTime: number = (60 * 30);

  public static lockScreenEnabled = true;

  embeddedComponentRequest = false;


  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthService,
    public templateService: TemplateService,
    public encryptionService: EncryptionService,
  ) {
  }

  setLockScreenTime() {
    if (ApiService.lockScreenEnabled) {
      const timeOut = (moment().unix() + ApiService.lockScreenDefaultTime).toString();
      window.localStorage.setItem('nf-session-time', timeOut);
      setInterval(() => {
        const sess: number = Number(window.localStorage.getItem('nf-session-time'));
        const currentTime = moment().unix();
        if (Number(currentTime) > sess) {
          ApiService.defaultBlockUI.next(false);
        }
      }, 20000);
    } else {
      ApiService.defaultBlockUI.next(true);
    }
  }

  create(apiUrl: string, showLoader = true, api = true): ApiService {
    if (this.embeddedComponentRequest === true) {
      apiUrl += '?eToken=' + window.localStorage.getItem('nf_embedded_app_id');
    }
    this.url = this.baseUrl + ((api) ? 'api/' : '') + apiUrl;
    this.showLoader = showLoader;
    this.setLockScreenTime();
    if (!this.embeddedComponentRequest) {
      this.authService.UserInactivityCheck();
    }
    return this;
  }

  crons(apiUrl: string, showLoader = true): ApiService {
    this.url = this.cronsApi + 'api/' + apiUrl;
    this.showLoader = showLoader;

    if (!this.embeddedComponentRequest) {
      if (this.authService.isLoggedIn())
        this.setLockScreenTime();
      this.authService.UserInactivityCheck();
    }
    return this;
  }

  get(param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    this._callApi('get', this.url, param, isSecure, onNext);
  }

  getObservable(param: Object, isSecure: boolean = true): any {
    return this._callApiObservable('get', this.url, param, isSecure);
  }

  post(param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    this._callApi('post', this.url, param, isSecure, onNext);
  }

  postBlob(param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    this._callApi('postBlob', this.url, param, isSecure, onNext);
  }

  postObservable(param: Object, isSecure: boolean = true): any {
    return this._callApiObservable('post', this.url, param, isSecure);
  }

  update(id, param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    if (id) {
      var url = this.url + '/' + id;
      this._callApi('put', url, param, isSecure, onNext);
    }
  }

  put(param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    var url = this.url + '/';
    this._callApi('put', url, param, isSecure, onNext);
  }

  delete(id, param: Object, onNext: (json: any, isSuccess: boolean) => void, isSecure: boolean = true): void {
    if (id) {
      var url = this.url + '/' + id;
      this._callApi('delete', url, param, isSecure, onNext);
    }
  }

  cancelRequest() {
    for (let i in this.aRequest) {
      this.aRequest[i].unsubscribe();
    }
  }

  toggleLoader(toggle: boolean) {
    if (this.authService.getLockScreenSession() === 'true')
      return false;
    if (toggle && !this.blockUI.isActive) {
      this.blockUI.start('Loading...'); // Start blocking
    } else if (!toggle && this.blockUI.isActive) {
      this.blockUI.stop(); // Stop blocking
    }
  }

  _callApi(type: string, url: string, params: any, isSecure: boolean, customCallback: (json: any, isSuccess: boolean) => void): void {
    ApiService.requestCounter++;

    if (window.localStorage.getItem('autoGroupDealer')) {
      if (typeof params == 'object') {
        params.__autoGroupDeaelrId = window.localStorage.getItem('autoGroupDealer');
      }
    }
    let oService;

    if (!isSecure) {
      url = url.replace('/api/', '/');
    }
    let oRequest;

    switch (type) {
      case 'get':
        let httpParams = new HttpParams();
        if (Object.keys(params).length != 0 && params.constructor === Object) {
          for (var i in params) {
            httpParams = httpParams.set(i, params[i]);
          }
        }
        oRequest = this.http.get(url, {'params': httpParams});
        break;
      case 'delete':
        oRequest = this.http.delete(url);
        break;
      case 'post':
      case 'put':
        if (environment.production && JSON.stringify(params) !== '{}' && typeof params == 'object') {
          params = {cryptDataObject: this.encryptionService.encryptData(params)};
        }
        oRequest = this.http[type](url, params);
        break;
      case 'postBlob':
        oRequest = this.http.post(url, params, {responseType: 'blob'});
        break;
    }

    if (this.showLoader) {
      this.toggleLoader(true);
    }
    /*console.log('fetching data: ' + JSON.stringify({ url: url, params: params }));*/

    let oResponse = oRequest.subscribe(
      response => {
        ApiService.responseCounter++;
        //hide loader when request and response count is equal
        if (ApiService.responseCounter === ApiService.requestCounter) {
          this.toggleLoader(false);
        }
        try {
          customCallback(response, true);
        } catch (error) {
          console.log(error);
        }
      },
      (error: any) => {
        ApiService.responseCounter++;
        if (ApiService.responseCounter === ApiService.requestCounter) {
          this.toggleLoader(false);
        }
        if (typeof error != 'undefined' && error.status == 401) {
          this.cancelRequest();
          this.templateService.error(error.message);
          this.authService.logout();
          this.router.navigateByUrl('/login');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
        if (typeof error != 'undefined' && error.status == 403) {
          this.cancelRequest();
          //this.templateService.error(error.message);
          //this.router.navigateByUrl('/home');
        }
        if (typeof error != 'undefined' && error.status == 500) {
          this.cancelRequest();
          if (error.error !== undefined && error.error.msg == '[Error] Only Image, PDF, MS-Document & Excel Sheet files are allowed!') {
            this.templateService.error(error.error.msg.replace('[Error] ', ''));
            return false;
          }
        }
        if (error == null && typeof error == 'undefined') {
          return customCallback('Something went wrong', false);
        }
        if (typeof error.message != 'undefined') {
          return customCallback(error.message, false);
        }
        if (typeof error.exceptionMessage != 'undefined') {
          this.templateService.error(error.exceptionMessage);
        } else if (typeof error.message != 'undefined') {
          this.templateService.error(error.message);
        }
        return customCallback(error, false);
      }
    );
    this.aRequest.push(oResponse);
  }

  _callApiObservable(type: string, url: string, params: Object, isSecure: boolean): any {
    let oService;

    if (!isSecure) {
      url = url.replace('/api/', '/');
    }

    let oRequest;
    if (this.showLoader) {
      this.toggleLoader(true);
    }


    switch (type) {
      case 'get':
        let httpParams = new HttpParams();
        if (Object.keys(params).length != 0 && params.constructor === Object) {
          for (var i in params) {
            httpParams = httpParams.append(i, params[i]);
          }
        }
        oRequest = this.http.get(url, {'params': httpParams});
        break;
      case 'delete':
        oRequest = this.http.delete(url);
        break;
      case 'post':
      case 'put':
        oRequest = this.http[type](url, params);
        break;
    }

    return oRequest;
  }
}
