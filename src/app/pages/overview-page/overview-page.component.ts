import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {slideToLeft} from "../../shared/animations/router.animations";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [slideToLeft],


})
export class OverviewPageComponent implements OnInit{
  weekOfYear: Date = new Date();
  today = new Date();
  public userKey: string;
  public user: any;
  horses: FirebaseListObservable<any[]>;
  trainings: FirebaseListObservable<any[]>;

  constructor(private angularfire: AngularFire) {

    this.angularfire.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.angularfire.database.object('userinfo/' + auth.uid);
          this.userKey = auth.uid;
          console.log(this.userKey);
        }
      });

  }

  ngOnInit(){

    this.userInfo();
  }

  userInfo(){

    this.horses = this.angularfire.database.list('/v1/horses/', {
      query: {
        orderByChild: 'owner_id',
        indexOn: "owner_id",
        equalTo: this.userKey,

      }
    });

  this.trainings = this.angularfire.database.list('/v1/trainings/', {
  query: {
    orderByChild: 'user',
    indexOn: "user",
    equalTo: this.userKey
  }

});

  }

  private list = [
    { id: 1, name: 'Basis' },
    { id: 2, name: 'Gait' },
    { id: 3, name: 'Time' },
    { id: 4, name: 'Distance' },
    { id: 5, name: 'Rider' },
    { id: 6, name: 'Turns' },
    { id: 7, name: 'Performance' }
  ];
  private _values2 = [];
  private current: number = 1;
  private log: string ='';

  private logDropdown(id: number): void {
    const NAME = this.list.find( (item: any) => item.id == id ).name;
   // this.log += `Value ${NAME} was selected\n`
  }
  selectedFromList(name:any){

    const obj = this.list[name];
    console.log(name, obj);
    if (!obj) return;
    if (obj.id == 1){
      this._values2 = ['Array','från', 'Basis'];
    }
    else if (obj.id == 2){
      this._values2 = ['Array','från', 'Gait'];
    }
    else if (obj.id == 3){
      this._values2 = ['Array','från', 'Time'];
    }
    else if (obj.id == 4){
      this._values2 = ['Array','från', 'Distance'];
    }
    else if (obj.id == 5){
      this._values2 = ['Array','från', 'Rider'];
    }
    else if (obj.id == 6){
      this._values2 = ['Array','från', 'Turns'];
    }
    else if (obj.id == 7){
      this._values2 = ['Array','från', 'Performance'];
    }
    else {
      this._values2 = [];
    }
  }
}
