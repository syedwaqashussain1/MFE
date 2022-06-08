import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  settingPanel = false;

  navigation: any[] = [
    {
      title: 'Sales Dashboard',
    },
    {
      title: 'Customers',
    },
    {
      title: 'Desklog',
    },
    {
      title: 'Inventory',
    },
    {
      title: 'Sales Logs',
    },
    {
      title: 'Budget Listing',
    },
    {
      title: 'Dealer Trades',
    },
    {
      title: 'Outside F&I Sales',
    },
    {
      title: 'Customers Concerns',
    },
    {
      title: 'CSI',
    },
    {
      title: 'Reports',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
