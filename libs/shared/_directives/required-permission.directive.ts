import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TemplateService} from "../_services";

@Directive({
  selector: '[appRequiredPermission]'
})

export class RequiredPermissionDirective implements OnInit {

  constructor(private elementRef: ElementRef, private authService: AuthService, private templateService: TemplateService) {
  }

  @Input('appRequiredPermission') requiredPermission: string;

  ngOnInit(): void {
    if (!this.userHasPermission(this.requiredPermission)) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

  userHasPermission(requiredPermission) {
    const user = this.templateService.getCurrentUser();

    if (user.userType.user_type_slug == 'admin-user') {
      return true;
    }

    const permiss: string[] = (typeof requiredPermission === 'string') ? [requiredPermission] : requiredPermission;
    const currentUser = this.authService.getUserSession();
    const userCurrentPermissions = currentUser.permissionsData;
    let pe = false;
    permiss.forEach((p) => {
      if (userCurrentPermissions && userCurrentPermissions.length > 0 && userCurrentPermissions.indexOf(p) !== -1) {
        pe = true;
      }
    });
    return pe;
  }
}
