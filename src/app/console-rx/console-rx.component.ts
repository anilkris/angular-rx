import { Component, OnInit } from '@angular/core';
import { interval, merge, of, switchMap ,mergeMap,reduce,combineLatest,tap,take,map} from 'rxjs';

@Component({
  selector: 'app-console-rx',
  templateUrl: './console-rx.component.html',
  styleUrls: ['./console-rx.component.scss']
})
export class ConsoleRxComponent implements OnInit {

  alphabet : any = ['a', 'b', 'c', 'd', ]
  input1Items: any = [];
  input2Items: any = [];

  inputStream1: any;
  inputStream2: any;

  outputItems: any = [];

  constructor() { }

  ngOnInit(): void {

      this.inputStream1 = interval(2000).pipe(
    tap(x=> console.log("Emitting", x)),
    tap(x=> this.input1Items.push(x)),
    take(2));
          this.inputStream2 = interval(1000).pipe(
    map(x=> this.alphabet[x]),
    tap(x=> console.log("Emitting", x)),
    tap(x=> this.input2Items.push(x)),
    take(3));


  }

  startInputStream() {
    this.inputStream1.subscribe();
 
  }
  startInputStream2() {

    this.inputStream2.subscribe();


   }

  switchMap() {
   this.input1Items = [];
   this.input2Items = [];
   this.outputItems = [];

    this.inputStream1.pipe(
      switchMap(()=> this.inputStream2)
    ).subscribe((y:any)=> {this.outputItems.push(y);console.log(y);});


  }

  combineLatest() {
  this.input1Items = [];
  this.input2Items = [];
  this.outputItems = [];

    const joinStream = combineLatest(this.inputStream1, this.inputStream2 );

    joinStream.subscribe((val)=> this.outputItems.push(val));

  }

}
