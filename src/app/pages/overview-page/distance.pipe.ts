import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'distance' })
export class distancePipe implements PipeTransform {

  distance = {
   km:1000,
    m:1
  };

  transform(meters){
    let distance_string: string = '';
    let plural: string = '';
    for(let key in this.distance){
      if(Math.floor(meters / this.distance[key]) > 0){
        if(Math.floor(meters / this.distance[key]) >1 ){
          plural = '';
        }
        else{
          plural = '';
        }

        distance_string += Math.floor(meters / this.distance[key]).toString() + ' ' + key.toString() + plural + ' ';
        meters = meters - this.distance[key] * Math.floor(meters / this.distance[key]);

      }
    }
    return distance_string;
  }
}
