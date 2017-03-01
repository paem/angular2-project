import {Component, OnDestroy, OnInit} from '@angular/core';
import {AF} from "../../services/af";
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})

export class NavComponent implements OnDestroy{
  isAuthenticated = false;
  public isCollapsed: boolean = true;
  private subscription: Subscription;

  constructor(private authService: AF) {


    this.subscription = this.authService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );

  }

  isAuth() {
    return this.isAuthenticated;
  }

  onSignOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
