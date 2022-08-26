import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/five-coffee/service/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  listProducts: any;
  arrays: any = [];
  editModal: any;
  modalRef!: BsModalRef;
  updateProductForm!: FormGroup;
  selectedFiles: any;
  progressInfos? : any;
  message = '';
  fileInfos!: Observable<any>;
  constructor(private uploadService:UploadFilesService,private productService:ProductService,private formBuiler: FormBuilder, private modalService: BsModalService,  private orderpipe: OrderPipe) { }

  ngOnInit(): void {
    this.fileInfos = this.productService.getFiles();
    this.show();
    this.updateProductForm = this.formBuiler.group({

      productId: [''],
      name: [''],
      // img: [''],
      description: [''],
      // qty: [''],
      price: [''],
      category: [''],

    })
  }
  show() {
    this.listProducts = this.productService.getProducts();
    // this.listProducts = this.orderpipe.transform(this.productService.getProducts(), 'id');
    this.arrays = this.listProducts;
    console.log("LIST PRODUCT", this.arrays, typeof this.arrays);
    // this.productService.getProducts().subscribe
    //   (data => {
    //     // console.log(data);
    //     this.listProducts = this.orderpipe.transform(data, 'id');
    //     this.arrays = data;
    //     console.log("LIST PRODUCT", this.arrays, typeof this.arrays);
    //     console.log(this.listProducts)
    //   })
     
  }
  removeProduct(listBook: any) {
    var result = confirm("Bạn chắc chắn muốn xóa ");
    if (result) {
      this.productService.removeAProduct(listBook.id).subscribe((res) => {
        console.log("da xoa")
        window.location.assign('http://localhost:4200/admin/product')
        let index = this.listProducts.indexOf(listBook);
        this.listProducts.splice(index, 1);
        
      })
    }
  }
  editProduct(editProduct: any) {
    this.editModal = editProduct;

  }
  realoadProduct(){
    this.show();
  }
  updateProduct() {
    console.log("id" + this.editModal.id);
    const { value } = this.updateProductForm;

    const productObj = {
      id: value.productId,
      name: value.name,
      // img: value.img,
      description: value.description,
      price: value.price,
      // qty: value.qty,
      category: value.category,

    }
    console.log(value.description),
    console.log(value.name),
    this.productService.getUpdateProduct(productObj, this.editModal.id).subscribe(
      (res =>{
        console.log("có vô đây không")
        console.log(res)
      })
    );
    window.location.assign('http://localhost:4200/admin/product')
  }

  openModalWithClass1(template: TemplateRef<any>) {
    console.log("sdfasdf")
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
}
