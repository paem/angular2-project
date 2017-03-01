import {Component, OnDestroy, OnInit} from '@angular/core';
import {AF} from "../../services/af";
import {Subscription} from "rxjs/Rx";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})

export class SideNavComponent implements OnDestroy, OnInit {
  isAuthenticated = false;
  private subscription: Subscription;
  user: any;

  constructor(private authService: AF, private angularFire: AngularFire) {

    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );




  }
  ngOnInit() {
    this.angularFire.auth.subscribe(user => {

      if(user) {
// gets users email if logged in
        this.user = this.angularFire.auth.getAuth().auth.email
      }
      else {
// user not logged in no email
        this.user = {};
      }
    });

  }

  onSignOut() {
    this.authService.logout();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
