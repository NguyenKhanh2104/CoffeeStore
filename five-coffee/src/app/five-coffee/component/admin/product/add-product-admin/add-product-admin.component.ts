import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shop-book/service/book.service';
import { UploadImageService } from 'src/app/shop-book/service/upload-image.service';
@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {
  formValue!: FormGroup;
  selectedFile!: File;

  id: any;
  detailBook: any;
  constructor(private bookService :BookService ,private formBuiler: FormBuilder, private route: ActivatedRoute,private router:Router,public uploadImageService:UploadImageService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuiler.group({
      bookId:[''],
      name: [''],
      status: [''],
      author: [''],
      img:[''],
      price : [''],
      sale_price: [''],
      description:[''],
      category:['']
      
    })

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.showBookDetail(this.id); 
  }
  public showBookDetail(id: any) {
    this.bookService.getABook(id).subscribe((res => {
      this.detailBook = res;
      // console.log(this.detailBook);
    }))
  }
  postBook(){
    const { value } = this.formValue;
    console.log(value);

    const postObj = {
      bookId: value.bookId,
      name: value.name,
      // password: "213",
      status: value.status,
      author: value.author,
      // category: value.category,
      img: value.img,
      price: value.price,
      sale_price: value.sale_price,
      description : value.description,
      category: value.category
    //  birthday: value.birthday,
      // birthday: value.birthday

    }

    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    this.bookService.getAddBook(postObj).subscribe((res) =>{
      console.log(res);
      console.log('da them sach hihi')
    })
   
    confirm("ĐÃ THÊM SÁCH ");

  }
  public onFileChange(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
