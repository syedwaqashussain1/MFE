import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealership-grid-graph-view',
  templateUrl: './grid-graph-view.component.html',
  styleUrls: ['./grid-graph-view.component.scss']
})
export class DealershipGridGraphViewComponent implements OnInit {
  summary = [
    {
      title: 'New Retail',
    },
    {
      title: 'Fleet/Non-Retail',
    },
    {
      title: 'Pre-owned Retail',
    },
    {
      title: 'Wholesale',
    },
    {
      title: 'New Retail',
    },
    {
      title: 'Incentive',
    },
    {
      title: 'Pre-owned Retail',
    },
    {
      title: 'Wholesale/Fleet',
    },
    {
      title: 'Chargebacks',
    },
    {
      title: 'New Deals',
    },
    {
      title: 'New Deals aged',
    },
    {
      title: 'Used Deals',
    },
    {
      title: 'Used Deals Aged',
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
  data: any;

  chartOptions: any = {
    plugins: {
        legend: {
            labels: {
                color: '#495057',
                padding: 20,
                boxWidth: 14,
                boxHeight: 14,
            },
            position: 'bottom',
        },
    }
};
  config: any = {
    theme: 'lara-light-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
};
  ngOnInit(): void {
    this.data = {
      labels: ['Sales','Front Gross','Back Gross'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#f20414",
                  "#32AD95",
                  "#F96A26",
              ],
              // hoverBackgroundColor: [
              //     "#FF6384",
              //     "#36A2EB",
              //     "#FFCE56",
              // ]
              borderWidth: 4,
          },
          {
              data: [300, 50, 100],
              backgroundColor: [
                "#f20414",
                "#32AD95",
                "#F96A26",
              ],
              borderWidth: 4
              // hoverBackgroundColor: [
              //     "#FF6384",
              //     "#36A2EB",
              //     "#FFCE56",
              // ]
          },
          {
              data: [300, 50, 100],
              backgroundColor: [
                "#f20414",
                "#32AD95",
                "#F96A26",
              ],
              borderWidth: 4
              // hoverBackgroundColor: [
              //     "#FF6384",
              //     "#36A2EB",
              //     "#FFCE56",
              // ]
          }
      ]
  };
  }
}
