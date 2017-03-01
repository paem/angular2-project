import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFire} from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private af: AngularFire,
              private router: Router) {

    console.log("AppComponent Loaded")


  }


  ngOnInit() {

    this.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in.");
          this.router.navigate(['/login']);
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");

          this.isLoggedIn = true;

        }
      });

  }
}

