import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealership-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class DealershipGridViewComponent implements OnInit {
  checked: boolean = false;
  summary = [
    {
      title: 'Retail Unit',
    },
    {
      title: 'Fleet/Non-Retail',
    },
    {
      title: 'Front',
    },
    {
      title: 'Back',
    },
    {
      title: 'Total (no Incentive)',
    },
    {
      title: 'Incentive',
    },
    {
      title: 'Front',
    },
    {
      title: 'Gross',
    },
    {
      title: 'Pack',
    },
    {
      title: 'Pack/Doc Fees',
    },
    {
      title: 'Back',
    },
    {
      title: 'Incentives',
    },
    {
      title: 'Wholesale',
    },
    {
      title: 'Gross before Adj',
    },
    {
      title: 'Chargebacks',
    },
  ];
  unitVal = [
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
    {
      title: '23',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
