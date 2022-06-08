import {Directive, Injectable, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplateService} from '../_services';


/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *jhiHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */

@Directive({
  selector: '[appHasActionAuthority]'
})

@Injectable()
export class HasActionAuthorityDirective {
  private authorities: string[];

  constructor(private templateService: TemplateService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set appHasActionAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [<string>value] : <string[]>value;
    this.updateView();
  }

  private updateView(): void {
    this.templateService.hasActionAuthority(this.authorities).then((result) => {
      this.viewContainerRef.clear();
      if (result) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
