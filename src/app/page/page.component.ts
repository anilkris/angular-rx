import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { interval, tap, map, take, switchMap, mergeMap, combineLatest, filter, of } from 'rxjs';
import { COUNTRIES } from '../Counties';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {


  ALPHABET: any = ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k']

  MYALPHABET= this.ALPHABET.slice(0,6);
  MYCOUNTRIES = COUNTRIES.map(x=>x.country).slice(0,6);
  inputCountries: any = this.MYCOUNTRIES;
  inputItems: any = this.MYALPHABET;

  inputStream: any;
  countriesStream: any;

  outputItems: any = [];
  isCountryStreamStart = false;
  isStreamStart = false;

  countriesSubscribe: any;
  inputSubscribe: any;
  constructor() { }

  ngOnInit(): void {


    this.inputStream = interval(3000).pipe(
      map(x => this.ALPHABET[x]),
      tap(x => this.inputItems.push(x)),
      take(6));

    this.countriesStream = interval(500).pipe(
      map(x => COUNTRIES[x]),
      tap(x=>console.log(x.country)),
      tap(x => this.inputCountries.push(x.country)),
      take(6));


  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  countriesStreamStateChange(isCountryStreamStart: boolean) {

    console.log("value of istreamisCountryStreamStart", isCountryStreamStart);
    if (isCountryStreamStart) {
      this.inputCountries = [];
      this.countriesSubscribe = this.countriesStream.subscribe(() => { }, () => { }, () => { console.log("completed"); isCountryStreamStart = false });
    } else {
      this.countriesSubscribe.unsubscribe();

      this.inputCountries = [];
      this.inputCountries = this.MYCOUNTRIES;
    }


  }

  inputStream2StateChange(isStreamStart: boolean) {

    if (isStreamStart) {
      this.inputItems = [];
      this.inputSubscribe = this.inputStream.subscribe(() => { }, () => { }, () => { console.log("completed"); isStreamStart = false });
    } else {

      this.inputSubscribe.unsubscribe();

      this.inputItems = [];
      this.inputItems = this.MYALPHABET;
    }

  }

  onSwitchMap() {
    this.inputCountries = [];
    this.inputItems = [];
    this.outputItems = [];

    this.inputStream.pipe(
      switchMap(this.getCountriesRequest$),
      map((x: any) => x.slice(0, 6)),
      tap(x => this.updateOutputItems(x))
    ).subscribe((y: any) => { this.outputItems.push(y.country); console.log(y); });

  }

  getCountries = (keys: any) => COUNTRIES.filter((e: any) =>
    e.country.toLowerCase().charAt(0) === keys.toLowerCase());


  getCountriesRequest$ = (keys: any) => of(this.getCountries(keys)).pipe(take(6));
  onMergeMap() {
    this.inputCountries = [];
    this.inputItems = [];
    this.outputItems = [];

    this.countriesStream.pipe(
      mergeMap(() => this.inputStream)
    ).subscribe((y: any) => { this.outputItems.push(y.country); console.log(y); });


  }

  onCombineLatest() {
    this.inputCountries = [];
    this.inputItems = [];
    this.outputItems = [];

    const joinStream = combineLatest(this.countriesStream.pipe(map((x:any)=>x.country)), this.inputStream);

    joinStream.subscribe((val) => this.outputItems.push(val));

  }
  updateOutputItems(countriesInfo: any): void {

    console.log("update output with", countriesInfo);

    if (Array.isArray(countriesInfo)) {
      const result = countriesInfo.map(x => x.country);
      this.outputItems = result;
    }


  }
}


