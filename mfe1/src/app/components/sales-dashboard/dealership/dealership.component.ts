import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealership',
  templateUrl: './dealership.component.html',
  styleUrls: ['./dealership.component.scss']
})
export class DealershipComponent implements OnInit {

  @Input() selectedView: any;
  
  constructor() { }
  ngOnInit(): void {}

}
