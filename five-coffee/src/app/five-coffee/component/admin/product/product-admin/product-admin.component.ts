import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  listBooks: any[] = [];
  arrays: any = [];
  editModal: any;
  modalRef!: BsModalRef;
  updateBookForm!: FormGroup;
  constructor(private formBuiler: FormBuilder, private modalService: BsModalService,  private orderpipe: OrderPipe) { }

  ngOnInit(): void {
    this.show();
    this.updateBookForm = this.formBuiler.group({

      bookId: [''],
      name: [''],
      img: [''],
      description: [''],
      status: [''],
      price: [''],
      sale_price: [''],
      author: [''],
      category: [''],

    })
  }
  show() {
    // this.bookService.getBooks().subscribe
    //   (data => {
    //     // console.log(data);
    //     this.listBooks = this.orderpipe.transform(data, 'id');
    //     this.arrays = data;
    //     console.log("LIST BOOK", this.arrays, typeof this.arrays);
    //     console.log(this.listBooks)
    //   })
  }
  removeBook(listBook: any) {
    // var result = confirm("Bạn chắc chắn muốn xóa ");
    // if (result) {
    //   this.bookService.removeABook(listBook.id).subscribe((res) => {
    //     console.log("da xoa")
    //     let index = this.listBooks.indexOf(listBook);
    //     this.listBooks.splice(index, 1);
    //   })
    // }
  }
  editBook(editBook: any) {
    this.editModal = editBook;

  }
  updateBook() {
    console.log("id" + this.editModal.id);
    const { value } = this.updateBookForm;

    const bookObj = {
      id: value.bookId,
      name: value.name,
      img: value.img,
      description: value.description,
      status: value.status,
      price: value.price,
      sale_price: value.sale_price,
      author: value.author,
      category: value.category,

    }
    
    // this.bookService.getUpdateBook(bookObj, this.editModal.id).subscribe(
    //   (res =>{
    //     console.log("có vô đây không")
    //     console.log(res)
    //   })
    // );
    // alert("ĐÃ chỉnh sửa")
  }

  openModalWithClass1(template: TemplateRef<any>) {
    console.log("sdfasdf")
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
