import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/five-coffee/service/auth.service';
import { UserService } from 'src/app/five-coffee/service/user.service';

@Component({
  selector: 'app-add-staff-admin',
  templateUrl: './add-staff-admin.component.html',
  styleUrls: ['./add-staff-admin.component.css']
})
export class AddStaffAdminComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        alert('Thêm tài khoản thành công')
        window.location.assign('http://localhost:4200/admin/staff')
      }
    );
  }
}
