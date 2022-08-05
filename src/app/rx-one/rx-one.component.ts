import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-rx-one',
  templateUrl: './rx-one.component.html',
  styleUrls: ['./rx-one.component.scss']
})
export class RxOneComponent implements OnInit {

  input1Items: any = [1,2,3,4,5,6,7];
  input2Items: any = ['a','b','c','d','e','f','g']

  outputItems: any;

  inputStream1: any;
  inputStream2: any;
  inputStream3: any;
  constructor() { }

  ngOnInit(): void {

  this.inputStream1 = of(this.input1Items);
  this.inputStream2= of(this.input2Items);

  this.inputStream3 = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi')
  }, 1000);
});

  }

  onClick() {

    console.log("Before subscribe");
    this.inputStream1.subscribe((x:any) => { console.log(x); this.outputItems= x});
    console.log("After subscribe");


  }

  onClickSwitchMap() {
    this.inputStream1.pipe(
      switchMap(
      (x) => this.inputStream2.pipe(map((y) => { console.log("Inner value", x, y);}))
      )
    ).subscribe(() => console.log("Subscribed"));
  }

  onClickMergeMap() {
    this.inputStream1.pipe(
      mergeMap(
        (x) => this.inputStream2.pipe(map((y) => console.log("Inner value", x, y)))
      )
    ).subscribe(() => console.log("Subscribed"));
  }


observable = new Observable(subscriber => {
  subscriber.next(this.inputStream1.push(1) );
  setTimeout(() => {
    subscriber.next(this.inputStream1.push(2));
    subscriber.complete();
  }, 1000);
});

observable2 = new Observable(subscriber => {
  subscriber.next(this.inputStream2.push('a'));
  setTimeout(() => {
    subscriber.next(this.inputStream2.push('b'));
    subscriber.complete();
  }, 1000);
});


}



