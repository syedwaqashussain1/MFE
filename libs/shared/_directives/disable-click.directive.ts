import {Directive, Input, HostListener, ElementRef, DoCheck, OnInit, OnDestroy} from '@angular/core';
import { NgControl } from "@angular/forms";
import {fromEvent, Subscription} from "rxjs";
import {TemplateService} from "../_services";

@Directive({
  selector: '[hasClickAuthority]'
})
export class DisableClickDirective implements OnInit, OnDestroy{
  subscription = new Subscription();
  private authorities: string[];

  constructor(private elRef: ElementRef, private templateService: TemplateService,) {}

  @Input()
  set hasClickAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [<string>value] : <string[]>value;
    const el = this.elRef.nativeElement;
    this.templateService.hasActionAuthority(this.authorities).then((result) => {
      if(result){
        this.subscription = fromEvent(el.parentNode, 'click', { capture: true })
          .subscribe((e: any) => {
            if (e.target === el) {
              e.stopPropagation();
            }
          });
      }
    });
  }

  ngOnInit() {
    /*const el = this.elRef.nativeElement;
    this.subscription = fromEvent(el.parentNode, 'click', { capture: true })
      .subscribe((e: any) => {
        if (e.target === el) {
          e.stopPropagation()
        }
      });*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
