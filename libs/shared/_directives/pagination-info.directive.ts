import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[paginationInfo]'
})

export class PaginationInfoDirective {
  constructor() { }
  @Input('paginationInfo') paginationInfo: any;
  @Input('value') set value(v){
      if(v && v.length > 0)
      {
        setTimeout(() => {          
          const dtHTML = this.paginationInfo.el.nativeElement;
          const paginatorDiv = dtHTML.querySelector('p-paginator div');
          if(paginatorDiv != null){
            const appendDiv = paginatorDiv.querySelector('.paginator-dt-record');
            if (typeof appendDiv != 'undefined' && appendDiv != null)
              appendDiv.remove();
            const totalRecords = (this.paginationInfo.totalRecords > 0) ? this.paginationInfo.totalRecords : v.length;
            const rows = (this.paginationInfo.first + this.paginationInfo.rows) > totalRecords ? totalRecords : (this.paginationInfo.first + this.paginationInfo.rows);  
            paginatorDiv.insertAdjacentHTML('beforeend', `<div class="paginator-dt-record">Showing <b>${this.paginationInfo.first + 1}</b> - <b>${rows}</b> of <b>${totalRecords}</b> records</div>`);          
          }
        }, 0);
      }
  };
}
