import { Component, OnInit,TemplateRef  } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/five-coffee/service/user.service';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/five-coffee/service/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
    searchText: any = '';
  updateUserForm!:FormGroup;
  errorMessage = '';
  selectedFiles: any;
  progressInfos? : any;
  message = '';
  fileInfos!: Observable<any>;
  constructor(private uploadService:UploadFilesService,private userService:UserService,private orderpipe: OrderPipe, private modalService: BsModalService, 
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
  selectFiles(event:any) {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }
  upload(idx:any, file:any) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {  
          const total:any = event.total;
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
          
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
       
      });
  }
  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
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
    window.location.assign('http://localhost:4200/admin/staff')
  }
  closeModal(){
    window.location.assign('http://localhost:4200/admin/staff')
  }
  searchThis(data: any) {
    if (data == "") {
      this.ngOnInit();
    } else {
      this.listUser = this.listUser.filter(res => {
        return res.name.toLocaleLowerCase().match(data.toLocaleLowerCase());
      })
    }
  }
}
