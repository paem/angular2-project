import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {slideToLeft} from "../../shared/animations/router.animations";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [fadeInAnimation, slideToLeft],
})


export class HomePageComponent implements OnInit {
  userinfo: FirebaseListObservable<any[]>;
  horses: FirebaseListObservable<any[]>;

  trainings: Observable<any[]>;
  graphDataTrainings: any[] = [];
  isLoading = false;

  constructor(private angularfire: AngularFire) {


  }

  ngOnInit() {

    // this.trainingsInfo();
    // this.horsesInfo();
  }


  /* userInfo() {


   this.userinfo = this.angularfire.database.list('/v1/userinfo/', {
   query: {
   orderByChild: 'id',
   indexOn: "id",
   equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'
   }
   });

   this.horses = this.angularfire.database.list('/v1/horses/', {
   query: {
   orderByChild: 'owner_id',
   indexOn: "owner_id",
   equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93',

   }
   });

   this.trainings = this.angularfire.database.list('/v1/trainings/', {
   query: {
   orderByChild: 'user',
   indexOn: "user",
   equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'
   }

   });


   }
   */

}












