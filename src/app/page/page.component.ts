import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { interval, tap, map, take, switchMap, mergeMap, combineLatest } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {


  ALPHABET: any = ['a', 'b', 'c', 'd', 'e', 'f']
  MYNUMBERS = [0, 1, 2, 3, 4, 5];
  input1Items: any = this.MYNUMBERS;
  input2Items: any = this.ALPHABET;

  inputStream1: any;
  inputStream2: any;

  outputItems: any = [];
  isStream1Start = false;
  isStream2Start = false;

  input1Subscribe: any;
  input2Subscribe: any;
  constructor() { }

  ngOnInit(): void {

    this.inputStream1 = interval(2000).pipe(
      tap(x => console.log("Emitting", x)),
      tap(x => this.input1Items.push(x)),
      take(6));
    this.inputStream2 = interval(1000).pipe(
      map(x => this.ALPHABET[x]),
      tap(x => console.log("Emitting", x)),
      tap(x => this.input2Items.push(x)),
      take(6));


  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  inputStream1StateChange(isStream1Start: boolean) {

    console.log("value of istreamisStream1Start", isStream1Start);
    if (isStream1Start) {
      this.input1Items = [];
      this.input1Subscribe = this.inputStream1.subscribe(() => { }, () => { }, () => { console.log("completed"); isStream1Start = false });
    } else {
      this.input1Subscribe.unsubscribe();

      this.input1Items = [];
      this.input1Items = this.MYNUMBERS;
    }



  }

  inputStream2StateChange(isStream2Start: boolean) {

    console.log("value of istreamisStream1Start", isStream2Start);
    if (isStream2Start) {
      this.input2Items = [];
      this.input2Subscribe = this.inputStream2.subscribe(() => { }, () => { }, () => { console.log("completed"); isStream2Start = false });
    } else {

      this.input2Subscribe.unsubscribe();

      this.input2Items = [];
      this.input2Items = this.ALPHABET;
    }

  }

  onSwitchMap() {
    this.input1Items = [];
    this.input2Items = [];
    this.outputItems = [];

    this.inputStream1.pipe(
      switchMap(() => this.inputStream2)
    ).subscribe((y: any) => { this.outputItems.push(y); console.log(y); });


  }

  onMergeMap() {
    this.input1Items = [];
    this.input2Items = [];
    this.outputItems = [];

    this.inputStream1.pipe(
      mergeMap(() => this.inputStream2)
    ).subscribe((y: any) => { this.outputItems.push(y); console.log(y); });


  }

  onCombineLatest() {
    this.input1Items = [];
    this.input2Items = [];
    this.outputItems = [];

    const joinStream = combineLatest(this.inputStream1, this.inputStream2);

    joinStream.subscribe((val) => this.outputItems.push(val));

  }
}
