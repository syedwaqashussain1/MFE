import { Component, OnInit } from '@angular/core';
import {ServiceReportsROMode} from '../../../../libs/shared/_enum/common-enum'

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  public test: ServiceReportsROMode

  constructor() { }

  ngOnInit(): void {

    this.test=ServiceReportsROMode.actual_line_type;

    console.log(this.test);

  }

}
