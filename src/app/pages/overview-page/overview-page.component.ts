import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {slideToLeft} from "../../shared/animations/router.animations";
import {Observable} from "rxjs";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [slideToLeft],


})
export class OverviewPageComponent implements OnInit {
  weekOfYear: Date = new Date();
  today = new Date();
  public userKey: string;
  public user: any;
  horses: Observable<any[]>;
  horseTrainings: Observable<any[]>;


  isLoading = true;

  currentHorseTrainings = [];
  demo = [];
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
  }


  /********************************************************
   hämta hem hästarna på: .../v1/horses/ + horse.key
   Varje häst har sedan träningar på sig
   som ni loopar över och hämtar ner från /v1/trainings/ + training.key
   ---------------------------------------------------------
   Example:  [horses] -> [horse, horse] -> [horseName, [trainings]]
   ---------------------------------------------------------
   ********************************************************/





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

        console.log(horse);

        // subscribe on current horse in loop to get data.
        horse.data.subscribe(myHorse => {

          // horse data
          console.log("HHH", myHorse);

          this.myPonnys.push(myHorse);


          // Get trainings of the horse
          this.getTrainings(myHorse);

        })
      });
    });
  }



  barChartData: any[] = [];

  // Get the horse trainings
  getTrainings(myhorse) {
    for (let trainingKey in myhorse.trainings) {
      this.horseTrainings = this.angularfire.database.object('/v1/trainings/' + trainingKey).map(trainings => {
          return trainings;
        }
      );


      this.horseTrainings.subscribe((training: any) => {
        this.currentHorseTrainings.push(training);
        let data = [training.canter.time, training.trot.time, training.walk.time];
        this.barChartData.push([ {data: data, label: 'Test Test'}]);
        this.isLoading = false;
      });

    }
  }











  trainingsInfo() {

    let userHorses = this.angularfire.database.list('/v1/userinfo/' + this.userKey + '/horses/')
      .map(horses => {
        horses.map(horse => {
          horse.data = this.angularfire.database.object('/v1/horses/' + horse.$key);
        });
        return horses;
      });

    userHorses.subscribe(horses => {
      horses.map(horse => {
        horse.data.subscribe(data => {

          console.log(data);
          console.log(data.trainings);


          for (let trainingKey in data.trainings) {
            this.horseTrainings = this.angularfire.database.list('/v1/trainings/' + trainingKey);
          }


          this.horseTrainings.subscribe(trainings => {
            console.log(data.$key);
            console.log(trainings);

            this.demo.push({horseKey: data.$key, data: data, trainings: trainings})
            console.log("custom horse array", this.demo);
          });

        });
      });
    });
  }


  private list = [
    {id: 1, name: 'Basis'},
    {id: 2, name: 'Gait'},
    {id: 3, name: 'Time'},
    {id: 4, name: 'Distance'},
    {id: 5, name: 'Rider'},
    {id: 6, name: 'Turns'},
    {id: 7, name: 'Performance'}
  ];
  private _values2 = [];
  private current: number = 1;
  private log: string = '';

  private logDropdown(id: number): void {
    const NAME = this.list.find((item: any) => item.id == id).name;
    // this.log += `Value ${NAME} was selected\n`
  }

  selectedFromList(name: any) {

    const obj = this.list[name];
    console.log(name, obj);
    if (!obj) return;
    if (obj.id == 1) {
      this._values2 = ['Array', 'från', 'Basis'];
    }
    else if (obj.id == 2) {
      this._values2 = ['Array', 'från', 'Gait'];
    }
    else if (obj.id == 3) {
      this._values2 = ['Array', 'från', 'Time'];
    }
    else if (obj.id == 4) {
      this._values2 = ['Array', 'från', 'Distance'];
    }
    else if (obj.id == 5) {
      this._values2 = ['Array', 'från', 'Rider'];
    }
    else if (obj.id == 6) {
      this._values2 = ['Array', 'från', 'Turns'];
    }
    else if (obj.id == 7) {
      this._values2 = ['Array', 'från', 'Performance'];
    }
    else {
      this._values2 = [];
    }
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

  public barChartLabels: string[] = ['canter','trot', 'walk'];


  public barChartType: string = 'bar';

  public barChartLegend: boolean = true;


}
