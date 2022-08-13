import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffAdminComponent } from './add-staff-admin.component';

describe('AddStaffAdminComponent', () => {
  let component: AddStaffAdminComponent;
  let fixture: ComponentFixture<AddStaffAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
