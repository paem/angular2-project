import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AF} from "../../services/af";
import {Router} from "@angular/router";
import {slideUpAnimation} from "../../shared/animations/slideUp.animation";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [slideUpAnimation],


})
export class LoginPageComponent {
  isLoading = false;
  public error: any;


  constructor(private afService: AF, private router: Router) {

  }

  loginWithEmail(form: NgForm) {
    this.isLoading = true;

    this.afService.loginWithEmail(form.value.email, form.value.password).then((data) => {
      console.log("SIGNED IN WITH EMAIL", data);
      this.isLoading = false;
      this.router.navigate(['/overview']);
    }).catch((error: any) => {
      if (error) {
        this.isLoading = false;
        this.error = error;
        console.log(this.error);
      }
    });
  }

  logInWithFacebook() {
    this.isLoading = true;
    this.afService.logInWithFacebook().then(authState => {
      console.log("SIGNED IN WITH FACEBOOK");

    }).catch(error => {
      this.isLoading = false;
      this.router.navigate(['/overview']);
    });
  }

}
