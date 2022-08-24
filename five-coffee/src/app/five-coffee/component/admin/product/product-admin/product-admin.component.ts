import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  listProducts: any[] = [];
  arrays: any = [];
  editModal: any;
  modalRef!: BsModalRef;
  updateProductForm!: FormGroup;
  constructor(private productService:ProductService,private formBuiler: FormBuilder, private modalService: BsModalService,  private orderpipe: OrderPipe) { }

  ngOnInit(): void {
    this.show();
    this.updateProductForm = this.formBuiler.group({

      productId: [''],
      name: [''],
      img: [''],
      description: [''],
      qty: [''],
      price: [''],
      category: [''],

    })
  }
  show() {
    this.productService.getProducts().subscribe
      (data => {
        // console.log(data);
        this.listProducts = this.orderpipe.transform(data, 'id');
        this.arrays = data;
        console.log("LIST PRODUCT", this.arrays, typeof this.arrays);
        console.log(this.listProducts)
      })
  }
  removeProduct(listBook: any) {
    var result = confirm("Bạn chắc chắn muốn xóa ");
    if (result) {
      this.productService.removeAProduct(listBook.id).subscribe((res) => {
        console.log("da xoa")
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
      img: value.img,
      description: value.description,
      price: value.price,
      qty: value.qty,
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
  }

  openModalWithClass1(template: TemplateRef<any>) {
    console.log("sdfasdf")
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
