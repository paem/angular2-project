import {Routes, RouterModule} from '@angular/router'
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {MyStablePageComponent} from "./pages/my-stable-page/my-stable-page.component";

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewPageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutPageComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'mystable', component: MyStablePageComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);


