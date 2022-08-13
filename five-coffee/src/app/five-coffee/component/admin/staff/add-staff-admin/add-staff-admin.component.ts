import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shop-book/service/user.service';

@Component({
  selector: 'app-add-staff-admin',
  templateUrl: './add-staff-admin.component.html',
  styleUrls: ['./add-staff-admin.component.css']
})
export class AddStaffAdminComponent implements OnInit {
  formValue!: FormGroup;
  selectedFile!: File;

  id: any;
  detailUser: any;
  constructor(private userService: UserService, private formBuiler: FormBuilder, private router:Router
    , private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.formValue = this.formBuiler.group({
      userId:[''],
      fullname: [''],
      email: [''],
      address: [''],
      sex: [''],
      phone : [''],
      position: [''],
      username: ['']
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.showUserDetail(this.id); 

  }

  public showUserDetail(id: any) {
    this.userService.getAUser(id).subscribe((res => {
      this.detailUser = res;
      console.log(this.detailUser);
    }))
  }
  postStaff(){
    const { value } = this.formValue;
    console.log(value);

    const postObj = {
      userId: value.userId,
      email: value.email,
      // password: "213",
      phone: value.phone,
      username: value.username,
      fullname: value.fullname,
      // img: "dsf",
      address: value.address,
      sex: value.sex,
     position: value.position,
    //  birthday: value.birthday,
      // birthday: value.birthday

    }

    console.log("ngày:" + value.birthday, typeof value.birthday);
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    this.userService.getAddUser(postObj).subscribe((res) =>{
      console.log(res);
    })

    confirm("ĐÃ THÊM NHÂN VIÊN ");

  }

  public onFileChange(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
