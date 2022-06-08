import {Injectable, OnInit} from '@angular/core';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {environment} from '../../environments/environment';
import {AuthService} from "./auth.service";

@Injectable()
export class SocketService {
  private static _socket: any = null;
  private socket: any;

  constructor(private authService: AuthService) {
  }

  init(): any {
    /*SOCKET*/
    const token = JSON.parse(localStorage.getItem('currentUser'));
    const user = AuthService._loggedInUserData;
    const config: SocketIoConfig = {
      url: environment.socketServer + '/' + user.autoDealer.domain_name,
      options: {query: {token: token.token}}
    };
    if(SocketService._socket == null){
      this.socket = new Socket(config);
    } else {
      this.socket = SocketService._socket;
    }
    return this;
  }

  decode(encodedString) {
    return JSON.parse(atob(encodedString));
  }

  alarm(): any {
    return this.socket.fromEvent("NF_ALARM_NOTIFICATION");
    /*if (this.authService.isLoggedIn()) {
      console.log("WATCH NF_ALARM_NOTIFICATION");

      t.subscribe((a) => {
        if(callback != null){
          callback(this.decode(a));
        }
        console.log(this.decode(a));
      });
      /!*this.socket.on("NF_ALARM_NOTIFICATION",  (a) => {
        if (callback != null) {
          callback(this.decode(a));
        }
        console.log(this.decode(a));
      });*!/
    }
    return this;*/
  }

  loginRotation(data) {
    return this.socket.emit("NF_LOGIN_USER", data);
  }

  refreshFNI(): any {
    return this.socket.fromEvent("NF_REFRESH_FNI_ROTATION");
    /*if (this.authService.isLoggedIn()) {
      console.log("WATCH NF_ALARM_NOTIFICATION");

      t.subscribe((a) => {
        if(callback != null){
          callback(this.decode(a));
        }
        console.log(this.decode(a));
      });
      /!*this.socket.on("NF_ALARM_NOTIFICATION",  (a) => {
        if (callback != null) {
          callback(this.decode(a));
        }
        console.log(this.decode(a));
      });*!/
    }
    return this;*/
  }

  notificationLogs() {
    return this.socket.fromEvent("NF_NOTIFICATION_LOGS");
  }
}
