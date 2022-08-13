import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/five-coffee/service/product.service';
@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {
  formValue!: FormGroup;
  selectedFile!: File;

  id: any;
  detailproduct: any;
  constructor( private productService:ProductService,private formBuiler: FormBuilder, private route: ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {
    this.formValue = this.formBuiler.group({
      productId:[''],
      name: [''],
      img:[''],
      price : [''],
     qty: [''],
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
  postProduct(){
    const { value } = this.formValue;
    console.log(value);

    const postObj = {
      id: value.productId,
      name: value.name,
      qty: value.qty,
      img: value.img,
      price: value.price,
      description : value.description,
      category: value.category

    }

    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    this.productService.getAddProduct(postObj).subscribe((res) =>{
      console.log(res);
      console.log('da them sach hihi')
      window.location.assign('http://localhost:4200/admin/product')
    })

  }
  public onFileChange(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
