import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import {FormsModule} from "@angular/forms";
import {HttpModule} from '@angular/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {routing} from "./app.routing";
import { MaterialModule } from '@angular/material';
import {AF} from "./services/af";
import { AuthGuard } from "./shared/guard/auth.guard";
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component';
import {MyStablePageComponent} from './pages/my-stable-page/my-stable-page.component';
import {SideNavComponent} from './navbar/sidenav/sidenav.component';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component'
import {ChartsModule} from "ng2-charts";
import { CollapseDirective } from 'ng2-bootstrap';
import {secondsToTimePipe} from "./shared/secondsToTime.pipe";
import {distancePipe} from "./shared/distance.pipe";


export const firebaseConfig = {
  apiKey: "AIzaSyBLAepT58ZEGZssaxDa5ohWJo3fjpP9gD8",
  authDomain: "equilab-157516.firebaseapp.com",
  databaseURL: "https://equilab-157516.firebaseio.com",
  storageBucket: "equilab-157516.appspot.com",
  messagingSenderId: "970803104790"
};


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),routing,
    FormsModule,
    HttpModule,
    MaterialModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    TournamentsPageComponent,
    SideNavComponent,
    OverviewPageComponent,
    MyStablePageComponent,
    CollapseDirective,
    secondsToTimePipe,
    distancePipe,

  ],
  bootstrap: [ AppComponent ],
  providers: [AF,AuthGuard]
})
export class AppModule {}
