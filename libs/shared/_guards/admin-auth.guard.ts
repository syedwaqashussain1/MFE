import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails = this.auth.getUserSession();
    let userHasPermission = false;

    if (this.auth.isLoggedIn() && userDetails && userDetails.userType && userDetails.userType.user_type_slug === 'admin-user') {
      const userCurrentPermissions = userDetails.permissionsData;
      if (next.data.hasOwnProperty('requiredPermission') && userCurrentPermissions &&
        userCurrentPermissions.length > 0 &&
        userCurrentPermissions.indexOf(next.data.requiredPermission) !== -1) {
        userHasPermission = true;
      }
      if (!next.data.hasOwnProperty('requiredPermission')) {
        userHasPermission = true;
      }
      if (userHasPermission === false) {
        this.router.navigate(['forbidden']);
        return userHasPermission;
      } else {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']);
    return false;
  }

}
