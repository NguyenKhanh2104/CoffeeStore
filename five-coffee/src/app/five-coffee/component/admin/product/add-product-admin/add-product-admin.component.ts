import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { UploadFilesService } from 'src/app/five-coffee/service/upload-files.service';
@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {
  formValue!: FormGroup;

  selectedFiles: any;
  progressInfos? : any;
  message = '';
  fileInfos!: Observable<any>;
  id: any;
  detailproduct: any;
   delay=2000; //2 second
  constructor( private uploadService:UploadFilesService,private productService:ProductService,private formBuiler: FormBuilder, private route: ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
    this.formValue = this.formBuiler.group({
      // productId:[''],
      name: [''],
      price : [''],
    //  qty: [''],
      description:[''],
      category:['']
      
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.showProductDetail(this.id); 
  }
  public showProductDetail(id: any) {
    this.productService.getAProduct(id).subscribe((res => {
      this.detailproduct = res;
      // console.log(this.detailBook);
    }))
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
 
   postProduct(){
    
    const { value } = this.formValue;
    console.log(value);
    const postObj = {
      // id: value.productId,
      name: value.name,
      // qty: value.qty,
      price: value.price,
      description : value.description,
      category: value.category

    }
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
  
     this.productService.getAddProduct(postObj).subscribe((res) =>{
      console.log(res);
      console.log('da them product hihi')
      window.location.assign('http://localhost:4200/admin/product')
    })
  }
  // delay(ms: number): Promise<any> {
  //   const dummyObservable = of();
  //   return dummyObservable.pipe(delay(ms)).toPromise();
// }
 
}
