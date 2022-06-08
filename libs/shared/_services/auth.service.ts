import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from "./encryption.service";
import { ISession } from "../interface";
import { CookieService } from 'ngx-cookie-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable()

export class AuthService {
  static _loggedInUserData: any = {};
  private INACTIVITY_TIME = 3600; // 1 HOUR 3600
  constructor(private router: Router, private cookieService: CookieService, private encryptionService: EncryptionService) {
  }

  public session: ISession;
  currentRoute: string;
  // Define Status code contants
  public access = {
    OK: 200,
    // "we don't know who you are, so we can't say if you're authorized to access
    // this resource or not yet, please sign in first"
    UNAUTHORIZED: 401,
    // "we know who you are, and your profile does not allow you to access this resource"
    FORBIDDEN: 403
  }


  setSession(data): void {
    this.session = <ISession>{};
    this.session['token'] = data.token;
    this.session['isLoggedIn'] = true;
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify(this.session));      
    }, 600);
  }

  setLockScreenSession(flag: string) {
    localStorage.setItem('lock-screen', flag)
  }

  getLockScreenSession() {
    return localStorage.getItem('lock-screen');
  }

  getSession(val: any): any {
    this.checkSession();
    return (this.session && this.session[val]) ? this.session[val] : null;
  }

  checkSession(): void {
    if (!(this.session && typeof this.session.token != 'undefined')) {
      this.session = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  setUserSession(data: any) {
    const allUserImages = JSON.stringify(data.allUserImages);
    const dealerLabels = JSON.stringify(data.dealerLabels);
    //set all users profile images
    localStorage.setItem('allUserImages', allUserImages);
    localStorage.setItem('dealerLabels', dealerLabels);
    if (environment.production) {
      localStorage.setItem('appUser', this.encryptionService.encryptData(data.user));
    }
    else {
      localStorage.setItem('appUser', JSON.stringify(data.user));
    }
    AuthService._loggedInUserData = data.user;
  }

  updateUsersImage(data: any) {
    const allUserImages = JSON.stringify(data.allUserImages);
    //set all users profile images
    localStorage.setItem('allUserImages', allUserImages);
    if (environment.production) {
      localStorage.setItem('appUser', this.encryptionService.encryptData(data.user));
    }
    else {
      localStorage.setItem('appUser', JSON.stringify(data.user));
    }
    AuthService._loggedInUserData = data.user;
  }

  updateAppDataObject(data) {
    if (environment.production) {
      localStorage.setItem('appUser', this.encryptionService.encryptData(data));
    } else {
      localStorage.setItem('appUser', JSON.stringify(data));
    }
    AuthService._loggedInUserData = data;
  }

  setLoggedInUserObject() {
    if (environment.production)
      AuthService._loggedInUserData = this.encryptionService.decryptData(localStorage.getItem('appUser'));
    else
      AuthService._loggedInUserData = JSON.parse(localStorage.getItem('appUser'));
  }

  setRoleTypeSession(data: any, roleType: string) {
    const smPermissions = JSON.stringify(data);
    setTimeout(() => {
      localStorage.setItem(`${roleType}_Permissions`, smPermissions);
    }, 200);    
  }

  //get logged in user detail from session
  getRoleTypeSession(roleType) {
    if (localStorage.getItem(`${roleType}_Permissions`)) {
      return JSON.parse(localStorage.getItem(`${roleType}_Permissions`));
    }
  }

  //get logged in user detail from session
  getUserSession() {
    if (localStorage.getItem('appUser')) {
      return AuthService._loggedInUserData;
    }
  }

  //get all users profile images
  getAllUserImagesSession() {
    if (localStorage.getItem('allUserImages')) {
      return JSON.parse(localStorage.getItem('allUserImages'));
    }
  }

  getVehicleClassification() {
    if (localStorage.getItem('appUser')) {
      return AuthService._loggedInUserData.autoDealer.vehicleClassifications;
    }
  }

  //get all dealer labels
  getDealerLabelsSession() {
    if (localStorage.getItem('dealerLabels')) {
      return JSON.parse(localStorage.getItem('dealerLabels'));
    }
  }

  isLoggedIn(): boolean {
    this.checkSession();
    return (this.session && this.session.isLoggedIn) ? this.session.isLoggedIn : null;
  }

  // logout clear session and object
  logout(): void {
    // this.cookieService.delete('roleId');
    localStorage.clear();
    localStorage.clear();
    this.session = <ISession>{};
    this.router.navigate(['./login']);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  removeCookieAndSession() {
    // this.cookieService.delete('roleId');
    localStorage.clear();
    localStorage.clear();
    this.session = <ISession>{};
  }

  // check user has permission for route
  isAuthenticated(route: string): any {
    if (this.isLoggedIn()) {
      this.currentRoute = route;
      return this.access.OK;
    } else {
      return this.access.UNAUTHORIZED;
    }
  }


  //if user is inctive for certain time
  UserInactivityCheck() {
    //every request API time saved in session storage
    const apiRequestDate = localStorage.getItem('apiRequestCall');
    const date = moment().format("MM-DD-YYYY");
    if (!(apiRequestDate && typeof apiRequestDate != 'undefined')) {
      localStorage.setItem('apiRequestCall', date);
    } else {
      //let last API request time
      const lastRequestDate = apiRequestDate;

      if (lastRequestDate != date) {
        // this.cookieService.delete('roleId');
        localStorage.clear();
        this.session = <ISession>{};
        this.router.navigate(['./login']);
        window.location.reload();
      } else {
        localStorage.setItem('apiRequestCall', date);
      }
    }
  }
}
