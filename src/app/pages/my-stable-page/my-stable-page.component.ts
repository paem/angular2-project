import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import {slideToLeft} from "../../shared/animations/router.animations";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs";

@Component({
  selector: 'app-my-stable-page',
  templateUrl: './my-stable-page.component.html',
  styleUrls: ['./my-stable-page.component.scss'],
  animations: [fadeInAnimation, slideToLeft],


})

export class MyStablePageComponent implements OnInit {
  public userKey: string;
  public user: any;
  horses: Observable<any[]>;
  horseTrainings: Observable<any[]>;
  currentHorseTrainings = [];

  isLoading = true;
  myPonnys = [];

  constructor(private angularfire: AngularFire) {
  }


  ngOnInit() {
    this.angularfire.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.angularfire.database.object('userinfo/' + auth.uid);
          this.userKey = auth.uid;
          console.log(this.userKey);
          // this.trainingsInfo();
          this.getHorses();

        }
      });
    // moment.locale('se');  // just nu är local satt till eng så söndag är på plats 0
  }


  // Get the horses and push them to this.myPonnys
  // and get each horse training.
  getHorses() {


    this.horses = this.angularfire.database.list('/v1/userinfo/' + this.userKey + '/horses/')
      .map(horses => {
        horses.map(horse => {
          horse.data = this.angularfire.database.object('/v1/horses/' + horse.$key);
        });
        return horses;
      });


    this.horses.subscribe(horses => {
      // foreach horse
      horses.map(horse => {

        // subscribe on current horse in loop to get data.
        horse.data.subscribe(myHorse => {

          // Get trainings of the horse
          this.getTrainings(myHorse);

        })
      });
    });
  }


  barChartData: any[] = [];

  horseAndTrainings: Observable<any[]>;

  // Get the horse trainings
  getTrainings(myhorse) {


    for (let trainingKey in myhorse.trainings) {


      this.horseAndTrainings = this.angularfire.database.object('/v1/trainings/' + trainingKey)
        .map(training => {
            return training;
          }
        );


      myhorse.trainingsData = [];

      this.horseAndTrainings.subscribe((training: any) => {
        myhorse.trainingsData.push(training);
      });

    }


    this.myPonnys.push(myhorse);
    this.isLoading = false;

  }


  public barChartOptions: any = {
    responsive: false,
    maintainAspectRatio: true,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    animationEasing: "easeInOutElastic",
    scaleShowLabels: false,
    legend: {display: false},
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    tooltips: {
      xPadding: 0,
      yPadding: 0,
      cornerRadius: 2,
      position: 'nearest',
    }

  };


  public barChartLabels: string[] = ['Canter', 'Trot', 'Walk'];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#ED6C44',
      borderColor: '#000000',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff'

    }


  ];


  public pieChartOptions: any = {
    responsive: true,
    animationEasing: "easeInOutElastic",
    legend: {display: false},
    tooltipEvents: [],
    showTooltips: true,
    tooltipCaretSize: 0,
    onAnimationComplete: function () {
      this.showTooltip(this.segments, true);
    },

  };

  public pieChartLabels: string[] = ['Left Turns', 'Right Turns'];
  public pieChartType: string = 'pie';


  public pieChartColors: Array<any> = [{backgroundColor: ["#ED6C44", "#00d9f9"]}];


}
