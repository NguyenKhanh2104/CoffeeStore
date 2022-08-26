import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/five-coffee/service/auth.service';
import { UploadFilesService } from 'src/app/five-coffee/service/upload-files.service';
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
  selectedFiles: any;
  progressInfos? : any;
  message = '';
  fileInfos!: Observable<any>;
  constructor(private uploadService:UploadFilesService,private authService: AuthService) { }

  ngOnInit(): void { }

  postUser(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        window.location.assign('http://localhost:4200/admin/staff')
      }
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
}
