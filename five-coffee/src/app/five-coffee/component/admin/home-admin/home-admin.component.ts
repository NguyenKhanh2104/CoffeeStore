import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/five-coffee/service/order.service';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { UserService } from 'src/app/five-coffee/service/user.service';
import { ProductAdminComponent } from '../product/product-admin/product-admin.component';
// import * as CanvasJS from './canvasjs.min.js';
// import * as JQuery from "jquery";

// declare var JQuery: any;
// const $ = JQuery.default;

declare var CanvasJS: any;
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  totalOrder:any
  totalMoneyInMonth:any
  totalProduct:any
  totalStaff:any
  listOrder:any;
  arrays: any = [];
  arrays2: any = [];
  arrays3: any = [];
  constructor(private userService:UserService,private orderService:OrderService,private productService:ProductService) { }

  ngOnInit() {
    this.showOrder();
    this.showProduct();
    this.showUser();
    this.showTotalMoney();
    let chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: '',
      },
      data: [
        {
          type: 'column', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: 'apple', y: 10 },
            { label: 'orange', y: 15 },
            { label: 'banana', y: 25 },
            { label: 'mango', y: 30 },
            { label: 'grape', y: 28 },
          ],
        },
      ],
    });
    chart.render();


    let chart2 = new CanvasJS.Chart('chartContainer1', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: '',
      },
      data: [
        {
          type: 'pie', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: 'apple', y: 10 },
            { label: 'orange', y: 15 },
            { label: 'banana', y: 25 },
            { label: 'mango', y: 30 },
            { label: 'grape', y: 28 },
          ],
        },
      ],
    });
    chart2.render();
  
  }
  showOrder(){
    this.orderService.getAllOrder().subscribe
    (data => {
      // console.log(data);
      // this.listOrder = this.orderpipe.transform(data, 'id');
      this.arrays = data;
      this.totalMoneyInMonth += data.totalPrice
      this.totalOrder = this.arrays.length

      // console.log("LIST Order", this.arrays, typeof this.arrays);
      // console.log(this.listOrder.length());
    })
  }
  showProduct(){
    this.productService.getProducts().subscribe
    (data2 => {
      // console.log(data);
      // this.listOrder = this.orderpipe.transform(data, 'id');
      this.arrays2 = data2;
      // this.userId = this.arrays.get
      this.totalProduct = this.arrays2.length

      // console.log("LIST Order", this.arrays2, typeof this.arrays);
      // console.log(this.listOrder.length());
    })
  }
  showUser(){
    this.userService.getUsers().subscribe
    (data3 => {
      // console.log(data);
      // this.listOrder = this.orderpipe.transform(data, 'id');
      this.arrays3 = data3;
      // this.userId = this.arrays.get
      this.totalStaff = this.arrays3.length

      // console.log("LIST Order", this.arrays2, typeof this.arrays);
      // console.log(this.listOrder.length());
    })
  }
  showTotalMoney(){
    this.orderService.getTotalMoney().subscribe
    (data4 => {
      // console.log(data);
      // this.listOrder = this.orderpipe.transform(data, 'id');
      this.totalMoneyInMonth = data4;
      // this.userId = this.arrays.get
      // this.totalStaff = this.arrays3.length

      // console.log("LIST Order", this.arrays2, typeof this.arrays);
      // console.log(this.listOrder.length());
    })
  }
}
