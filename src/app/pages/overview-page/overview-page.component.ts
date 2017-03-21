import {Component, OnInit} from '@angular/core';
import {slideToLeft} from "../../shared/animations/router.animations";



@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [slideToLeft],


})
export class OverviewPageComponent implements OnInit {

  constructor() {
  }


  ngOnInit() {





  }


}
