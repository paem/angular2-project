import {Component} from '@angular/core';
import {slideUpAnimation} from "../../shared/animations/slideUp.animation";
import {slideToLeft} from "../../shared/animations/router.animations";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  animations: [slideUpAnimation, slideToLeft],


})

export class AboutPageComponent {
}
