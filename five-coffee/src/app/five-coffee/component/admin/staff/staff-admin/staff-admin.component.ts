import { Component, OnInit,TemplateRef  } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private orderpipe: OrderPipe, private modalService: BsModalService, 
     private formBuiler: FormBuilder) { }

  ngOnInit(): void {
    this.show();

    this.updateUserForm = this.formBuiler.group({
      
      userId:[''],
      fullname: [''],
      username: [''],
      email: [''],
      address: [''],
      sex: [''],
      position: [''],
      phone : [''],

    })
  }

  show() {
    // this.userService.getUserBoard().subscribe
    //   (data => {
    //     // this.listUser = JSON.parse(data);
    //     this.listUser = this.orderpipe.transform(data, 'username');
    //     this.arrays = data;
    //     console.log(this.listUser, typeof this.listUser);
    //   })
  }

  removeUser(listUser: any) {
    // alert("Bạn chắc chắn muốn xóa ")


    // var result = confirm("Bạn chắc chắn muốn xóa ");
    // if (result) {
    //   this.userService.getRemoveUser(listUser.id).subscribe((res) => {
    //     let index = this.listUser.indexOf(listUser);
    //     this.listUser.splice(index, 1);
    //   })
    // } else {
    //   alert("Bye!!");
    // }
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
      email: value.email,
      username: value.username,
      address: value.address,
      phone: value.phone,
      sex: value.sex,
      fullname: value.fullname,
      position: value.position

  
    }
 
    // console.log(" test thử: " + value.updateUserFullname)
    // this.userService.getUpdateUser(userObj, this.editModal.id).subscribe(
    //   (res =>{
    //     console.log("có vô đây không")
    //     console.log(res)
    //   })
    // );
    // alert("ĐÃ chỉnh sửa")
  }
}
