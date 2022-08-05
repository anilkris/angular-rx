import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleRxComponent } from './console-rx.component';

describe('ConsoleRxComponent', () => {
  let component: ConsoleRxComponent;
  let fixture: ComponentFixture<ConsoleRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleRxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
