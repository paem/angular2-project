import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'secondsToTime' })
export class secondsToTimePipe implements PipeTransform {

  times = {
    minute: 60,
    second: 1
  }

  transform(seconds){
    let time_string: string = '';
    let plural: string = '';
    for(var key in this.times){
      if(Math.floor(seconds / this.times[key]) > 0){
        if(Math.floor(seconds / this.times[key]) >1 ){
          plural = 's';
        }
        else{
          plural = '';
        }

        time_string += Math.floor(seconds / this.times[key]).toString() + ' ' + key.toString() + plural + ' ';
        seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

      }
    }
    return time_string;
  }
}
