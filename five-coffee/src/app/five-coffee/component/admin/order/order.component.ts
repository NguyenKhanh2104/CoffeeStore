import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';
import { OrderService } from 'src/app/five-coffee/service/order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  updateUserForm!:FormGroup;
  listOrder: any[] = [];
  listOrderItem:any;
  arrays: any = [];
  arrays2: any = [];
  totalQuantity = 0;
  totalPrice = 0;
  editModal: any;
  listOrderId:any;
  modalRef!: BsModalRef;
  updateOrderForm!: FormGroup;
  constructor(private modalService: BsModalService,private formBuiler: FormBuilder,private orderService:OrderService,private orderpipe:OrderPipe) { }

  ngOnInit(): void {
    this.show();
    this.updateOrderForm = this.formBuiler.group({

      orderId: [''],
      note: [''],
      payment_type: [''],
      fullName: [''],
      totalPrice: [''],
      dateCreate: ['']

    })
  }
  show() {
    this.orderService.getAllOrder().subscribe
      (data => {
        // console.log(data);
        this.listOrder = this.orderpipe.transform(data, 'id');
        this.arrays = data;
        console.log("LIST Order", this.arrays, typeof this.arrays);
        console.log(this.listOrder)
      })
  }
  updateOrder() {
    const { value } = this.updateOrderForm;

    const orderObj = {
      id: value.orderId,
      note: value.note,
      payment_type: value.payment_type,
      fullName: value.fullName,
      totalPrice: value.totalPrice,
      dateCreate: value.dateCreate,

    }
    
    this.orderService.getUpdateProduct(orderObj, this.editModal.id).subscribe(
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
  editOrder(editOrder: any) {
    this.editModal = editOrder;

  }
  removeOrder(listOrder: any) {
    var result = confirm("Bạn chắc chắn muốn xóa ");
    if (result) {
      this.orderService.removeAOrder(listOrder.id).subscribe((res) => {
        console.log("da xoa")
        let index = this.listOrder.indexOf(listOrder);
        this.listOrder.splice(index, 1);
      })
    }
  }
  showOrderItem(listOrderId:any){
    this.orderService.getOrderItem(listOrderId.id).subscribe(
      res2 =>{
        this.listOrderItem= this.orderpipe.transform(res2, 'productName');
        this.arrays2 = res2;
        // this.totalQuantity +=this.arrays2.quantity;
        // this.totalPrice +=this.arrays2.price;
        // console.log('list arrays2' + this.arrays2);
      }
    )
  }
}
