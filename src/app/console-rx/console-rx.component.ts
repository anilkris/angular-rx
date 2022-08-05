import { Component, OnInit } from '@angular/core';
import { interval, of, switchMap } from 'rxjs';

import { map, take,tap  } from 'rxjs/operators';
@Component({
  selector: 'app-console-rx',
  templateUrl: './console-rx.component.html',
  styleUrls: ['./console-rx.component.scss']
})
export class ConsoleRxComponent implements OnInit {

  input1Items: any = [1, 2, 3, 4, 5, 6, 7];
  input2Items: any = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

  inputStream1: any;
  inputStream2: any;

  constructor() { }

  ngOnInit(): void {

  }

  startInputStream() {
   this.inputStream1 = interval(1000).pipe(tap(x=> console.log("Emitting", x)), take(2));

  }
  startInputStream2() {


   this.inputStream2 = interval(1000).pipe(tap(x=>console.log("Emitting stream2", x)), take(3));
  }

  switchMap() {

    this.inputStream1.pipe(
      switchMap(val => {
        console.log('Source value from inputStream1: ' + val)
        console.log('starting new observable: ')
        return this.inputStream2; 
      })
    )
      .subscribe((ret: any) => {
        console.log('Received ' + ret);
      })
  }


}
