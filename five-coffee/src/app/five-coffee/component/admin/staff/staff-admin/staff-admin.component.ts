import { Component, OnInit,TemplateRef  } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/five-coffee/service/user.service';

@Component({
  selector: 'app-staff-admin',
  templateUrl: './staff-admin.component.html',
  styleUrls: ['./staff-admin.component.css']
})
export class StaffAdminComponent implements OnInit {
  modalRef!: BsModalRef;  
  listUser: any[] = [];
  arrays: any = [];
  public userObj: any = [];
    editModal:any;
  updateUserForm!:FormGroup;

  constructor(private userService:UserService,private orderpipe: OrderPipe, private modalService: BsModalService, 
     private formBuiler: FormBuilder) { }

  ngOnInit(): void {
    this.show();

    this.updateUserForm = this.formBuiler.group({
      
      userId:[''],
      fullName: [''],
      username: [''],
      email: [''],
      address: [''],
      sex: [''],
      role: [''],
      phone : [''],
      birthday:['']

    })
  }

  show() {
    this.userService.getUsers().subscribe
      (data => {
        // this.listUser = JSON.parse(data);
        this.listUser = this.orderpipe.transform(data, 'id');
        this.arrays = data;
        console.log(this.listUser, typeof this.listUser);
      })
  }

  removeUser(listUser: any) {
    var result = confirm("Bạn chắc chắn muốn xóa ");
    if (result) {
      this.userService.removeUser(listUser.id).subscribe((res) => {
        let index = this.listUser.indexOf(listUser);
        this.listUser.splice(index, 1);
      })
    }
  }

  editUser(editUser: any){
    // console.log(editUser);
    console.log(editUser);
    this.editModal = editUser;

  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
  }  

  updateUser(){
    console.log("id" + this.editModal.id);
    const {value} = this.updateUserForm;

    const userObj = {
      userId: value.userId,
      fullName:value.fullName,
      email: value.email,
      username: value.username,
      address: value.address,
      phone: value.phone,
      sex: value.sex,
      birthday:value.birthday,
      role: value.role

  
    }
 
    this.userService.getUpdateUser(userObj, this.editModal.id).subscribe(
      (res =>{
      
        console.log(res)
      })
    );
  }
}
