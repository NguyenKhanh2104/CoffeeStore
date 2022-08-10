import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { TokenStorageService } from 'src/app/five-coffee/service/token-storage.service';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.css']
})
export class BodyHomeComponent implements OnInit {
  listProducts: any[] = [];
  page = 1;
  count = 0;
  cart_qty = 0;
  tableSize = 8;
  id: any;
  sizeId = 1;
  searchText: any = '';
  searchKey: any = '';
  constructor(private orderpipe: OrderPipe,private productService:ProductService) { }

  ngOnInit(): void {
    this.show();
  }
  arrays: any = [];
  show() {
    this.productService.getProducts().subscribe
      (data => {
        // console.log(data);
        this.listProducts = this.orderpipe.transform(data, 'name');
        this.arrays = data;
        console.log("LIST BOOK",this.arrays,typeof this.arrays);

      })
  }
  tabSize(event: number) {
    this.page = event;
    this.show();
  }
  searchThis(data: any) {
    if (data == "") {
      this.ngOnInit();
    } else {
      this.listProducts = this.listProducts.filter(res => {
        return res.name.toLocaleLowerCase().match(data.toLocaleLowerCase());
      })
    }
  }
}
