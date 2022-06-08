import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor() { }

  @Input() selectedView: any;

  ngOnInit(): void {
  }

}
