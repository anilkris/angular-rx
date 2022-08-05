import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxOneComponent } from './rx-one.component';

describe('RxOneComponent', () => {
  let component: RxOneComponent;
  let fixture: ComponentFixture<RxOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
