import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {slideToLeft} from "../../shared/animations/router.animations";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home-page',
  templateUrl: 'tournaments-page.component.html',
  styleUrls: ['tournaments-page.component.css'],
  animations: [fadeInAnimation, slideToLeft],
})


export class TournamentsPageComponent implements OnInit {

  constructor() {


  }

  ngOnInit() {

  }


}












