import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveCoffeeComponent } from './five-coffee.component';

describe('FiveCoffeeComponent', () => {
  let component: FiveCoffeeComponent;
  let fixture: ComponentFixture<FiveCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
