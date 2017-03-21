import {Routes, RouterModule} from '@angular/router'
import {TournamentsPageComponent} from "./pages/tournaments-page/tournaments-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {MyStablePageComponent} from "./pages/my-stable-page/my-stable-page.component";

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'overview', component: OverviewPageComponent, canActivate: [AuthGuard] },
  { path: 'tournaments', component: TournamentsPageComponent, canActivate: [AuthGuard] },
  { path: 'mystable', component: MyStablePageComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/mystable', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);


