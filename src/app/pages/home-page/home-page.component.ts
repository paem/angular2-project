import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../shared/animations/fadeIn.animation";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {slideToLeft} from "../../shared/animations/router.animations";
import {Observable} from "rxjs";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [fadeInAnimation, slideToLeft],
})


export class HomePageComponent implements OnInit {
  userinfo: FirebaseListObservable<any[]>;
  horses: FirebaseListObservable<any[]>;

  trainings: Observable<any[]>;
  graphDataTrainings: any[] = [];
  isLoading = false;

  constructor(private angularfire: AngularFire) {


  }

  ngOnInit() {

    this.trainingsInfo();
    this.horsesInfo();
  }


 /* userInfo() {


    this.userinfo = this.angularfire.database.list('/v1/userinfo/', {
      query: {
        orderByChild: 'id',
        indexOn: "id",
        equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'
      }
    });

    this.horses = this.angularfire.database.list('/v1/horses/', {
      query: {
        orderByChild: 'owner_id',
        indexOn: "owner_id",
        equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93',

      }
    });

    this.trainings = this.angularfire.database.list('/v1/trainings/', {
      query: {
        orderByChild: 'user',
        indexOn: "user",
        equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'
      }

    });


  }
*/

  // DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO
  // DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO
  // DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO
  // DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO
  // DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO DEMO


  beatArray = [];
  horsesArray = [];
  horseNameArray = [];
  totalTimeArray = [];
  results: Observable<any[]>;

  /* trainingsInfo() {

   let uid = "25sZYMr8t9ZZCMtoaCq7NffdIP93";

   // Map the stuffs
   let userTrainings = this.angularfire.database.list('/v1/userinfo/' + uid + '/trainings/', {
   query: {},
   }).map(results => {
   results.map(result => {
   result.trainings = this.angularfire.database.object('/v1/trainings/' + result.$key);
   });
   return results;
   });


   // Subscribes to the userTrainings
   userTrainings.subscribe(userTrainings => {
   userTrainings.forEach(userTraining => {
   userTraining.trainings.subscribe(training => {
   // user traingings comes here
   console.log(training);
   });

   })
   });
   }
   */

  trainingsInfo() {

    console.log("trainings info init");


    let test = this.angularfire.database.list('/v1/trainings/', {
      query: {
        orderByChild: 'user',
        equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'

      },
    }).subscribe(results => {
      // results = trainings
      //console.log(results);

      results.forEach(result => {
        // result = ONE training object
        console.log(result.horse);
        console.log(result.horse);
        this.beatArray.push(result.canter.beat);
        this.horsesArray.push(result.horse);
        this.totalTimeArray.push(result.total.time);

      });

      console.log(results);

      // init graph here

    });

  }

  horsesInfo() {

    console.log("horses info init");


    let test = this.angularfire.database.list('/v1/horses/', {
      query: {
        orderByChild: 'owner_id',
        equalTo: '25sZYMr8t9ZZCMtoaCq7NffdIP93'

      },
    }).subscribe(results => {
      // results = horses
      //console.log(results);

      results.forEach(result => {
        // result = ONE horse object
        console.log(result.horse);
        console.log(result.horse);
        this.horseNameArray.push(result.name);


      });

      console.log(results);
      this.isLoading = true;
      // init graph here

    });


  }


  public barChartOptions: any = {
    responsive: true,
    barThickness: 100


  };

public barChartColors:Array<any> = [
  {
    backgroundColor: '#ff724f',
    borderColor: '#000000',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#fff'

}


];

  public barChartLabels: string[] = this.horseNameArray;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: this.totalTimeArray, label: 'Test Test'},


  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}














