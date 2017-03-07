import {Component} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import {slideToLeft} from "../../shared/animations/router.animations";
@Component({
  selector: 'app-my-stable-page',
  templateUrl: './my-stable-page.component.html',
  styleUrls: ['./my-stable-page.component.scss'],
  animations: [fadeInAnimation, slideToLeft],


})

export class MyStablePageComponent {


}
