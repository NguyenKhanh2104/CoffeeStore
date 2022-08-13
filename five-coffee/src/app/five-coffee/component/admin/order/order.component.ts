import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  updateUserForm!:FormGroup;
  listOrder: any[] = [];
  arrays: any = [];
  constructor() { }

  ngOnInit(): void {
    this.show();
   
  }
  show() {
    // this.order.getOrder().subscribe
    //   (data => {
    //     // console.log(data);
    //     this.listOrder = this.orderpipe.transform(data, 'id');
    //     this.arrays = data;
    //     console.log("LIST BOOK", this.arrays, typeof this.arrays);
    //     console.log(this.listOrder)
    //   })
  }
  

}
