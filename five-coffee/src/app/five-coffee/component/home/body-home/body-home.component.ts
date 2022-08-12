import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { isEmpty } from 'rxjs';
import { CategoryService } from 'src/app/five-coffee/service/category.service';
import { ProductService } from 'src/app/five-coffee/service/product.service';
import { TokenStorageService } from 'src/app/five-coffee/service/token-storage.service';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.css']
})
export class BodyHomeComponent implements OnInit {
  listProducts: any[] = [];
  listCategory: any[] = [];
  page = 1;
  selectedTeam = '';
  category = '';
  count = 0;
  cart_qty = 0;
  tableSize = 8;
  id: any;
  sizeId = 1;
  searchText: any = '';
  searchKey: any = '';
  data = '';
  constructor(private orderpipe: OrderPipe, private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.show();
    this.showCategory();
    this.onSelected(this.data);
    // this.searchByCategory(this.category);

  }
  arrays: any = [];
  arrays2: any = [];
  show() {
    this.productService.getProducts().subscribe
      (data => {
        // console.log(data);
        this.listProducts = this.orderpipe.transform(data, 'name');
        this.arrays = data;
        console.log("LIST BOOK", this.arrays, typeof this.arrays);

      })


  }
  showCategory() {
    this.categoryService.getProductsByCategory().subscribe(data => {
      this.listCategory = this.orderpipe.transform(data, 'name');
      this.arrays2 = data;
    })
  }
  tabSize(event: number) {
    this.page = event;
    this.show();
  }
  onSelected(value: any) {
    this.selectedTeam = value;
    this.category = this.selectedTeam;
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
  // searchByCategory(data:any) {

  //   if(this.category == data){

  //     this.categoryService.getBookByCategory(1).subscribe((res) => {
  //       this.listProducts = res;
  //       console.log("nhi lun")
  //       console.log(this.listProducts);
  //       this.category = this.selectedTeam;
  //       console.log(this.category);
  //       console.log(this.selectedTeam);
  //     })
  //   }else if(this.category = "Ăn vặt"){

  //     this.categoryService.getBookByCategory(2).subscribe((res) => {
  //       this.listProducts = res;
  //       console.log("khanh dep trai")
  //       console.log(this.listProducts);
  //     })
  //   }else{
  //     this.ngOnInit();
  //   }

  // }
  setNewProduct(id: any): void {
    
    if(id==1){
      this.productService.getProducts().subscribe
      (data => {
        // console.log(data);
        this.listProducts = this.orderpipe.transform(data, 'name');
        this.listProducts = this.listProducts.filter(value => value.category === 1);
      });
    }else if(id==2){
      this.productService.getProducts().subscribe
      (data => {
        // console.log(data);
        this.listProducts = this.orderpipe.transform(data, 'name');
        this.listProducts = this.listProducts.filter(value => value.category === 2);
      });
      
  }else{
    this.show();
  }
  }
}

