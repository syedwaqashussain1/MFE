import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {ApiService, TemplateService} from '../_services';
import {EncryptionService} from '../_services/encryption.service';
import {ServiceAppointmentService} from "../embeddable-forms/services/service-appointment.service";

@Injectable()
export class EmbeddableComponentsGuard implements CanActivate {

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private enc: EncryptionService) {
    ApiService.lockScreenEnabled = false;
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.apiService.embeddedComponentRequest = true;
    const component = next.data.component;
    const prom: boolean = await new Promise((resolve) => {
      if (next.params.token) {
        const url = (window.location !== window.parent.location)
          ? document.referrer
          : document.location.href;
        window.localStorage.setItem('nf_embedded_token', next.params.token);
        this.apiService.create('embed-component/authenticate', false, false).post({
          eToken: next.params.token,
          component,
          app: this.enc.encryptData(url)
        }, (result) => {
          if (result.data.authenticated) {
            ServiceAppointmentService.settings = this.enc.decryptData(result.data.settings);
            ServiceAppointmentService.background = result.data.background;
            window.localStorage.setItem('nf_embedded_app_id', result.data.app_id);
            TemplateService.embeddedComponentData = {
              logo: result.data.logo,
              dealership_name: result.data.dealership_name
            };
          } else {
            window.localStorage.removeItem('nf_embedded_app_id');
          }
          resolve(result.data.authenticated);
        });
      } else {
        window.localStorage.removeItem('nf_embedded_app_id');
        resolve(false);
      }
    });
    return prom;
  }
}
