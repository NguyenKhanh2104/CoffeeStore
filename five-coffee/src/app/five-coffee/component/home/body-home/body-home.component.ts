import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { isEmpty,map } from 'rxjs';
import { CartService } from 'src/app/five-coffee/service/cart.service';
import { CategoryService } from 'src/app/five-coffee/service/category.service';
import { OrderService } from 'src/app/five-coffee/service/order.service';
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
  listBill: any[] = [];
  listBillItem: any[] = [];
  selectedTeam = '';
  selectedType = '';
  category = '';
  count = 0;
  cart_qty = 0;
  moneyFromCus =0;
  moneyPayCus : any;
  noteCheckout = "";
  tableSize = 8;
  checkCartQty = false;
  id: any;
  sizeId = 1;
  pay_type = "";
  searchText: any = '';
  searchKey: any = '';

  data = '';
  public cartObj: any = [];
  selectedg3 = ''
  cartTotalPrice: any;
  test = 'Mang đi'
  constructor(private httpClient:HttpClient,private orderservice: OrderService, private http: TokenStorageService, private orderpipe: OrderPipe, private productService: ProductService,
    private categoryService: CategoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.show();
    this.showCategory();
    // this.onSelected(this.selectedTeam);
    this.getCartDetailsByUser();
    //below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe(data => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
    console.log(this.selectedType);
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
   
  selectedArray = [

    {
      id: 1,
      name: "Bàn 1"
    },
    {
      id: 2,
      name: "Bàn 2"
    },
    {
      id: 3,
      name: "Bàn 3"
    }
  ]

  
  searchThis(data: any) {
    if (data == "") {
      this.ngOnInit();
    } else {
      this.listProducts = this.listProducts.filter(res => {
        return res.name.toLocaleLowerCase().match(data.toLocaleLowerCase());
      })
    }
  }

  setNewProduct(id: any): void {

    if (id == 1) {
      this.productService.getProducts().subscribe
        (data => {
          // console.log(data);
          this.listProducts = this.orderpipe.transform(data, 'name');
          this.listProducts = this.listProducts.filter(value => value.category === 1);
        });
    } else if (id == 2) {
      this.productService.getProducts().subscribe
        (data => {
          // console.log(data);
          this.listProducts = this.orderpipe.transform(data, 'name');
          this.listProducts = this.listProducts.filter(value => value.category === 2);
        });

    } else {
      this.show();
    }
  }
  addCart(cartProductObj: any) {
    var cartObj = {
      "productId": cartProductObj.id,
      "qty": "1",
      "price": cartProductObj.price
    }
    this.cartService.addCart(cartObj);
    console.log(cartObj);
  }
  getCartDetailsByUser() {
    this.http.postRequestWithToken("api/staff/getCartsByUserId", {}).subscribe((data: any) => {
      this.cartObj = data;
      this.cartTotalPrice = this.getTotalAmounOfTheCart();
    }, error => {

    })
  }
  getTotalAmounOfTheCart() {
    let obj = this.cartObj;
    let totalPrice = 0;
    for (var o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }
    return totalPrice.toFixed(2);
  }
  qtyChange(qty: any, cartObj: any) {
    var request = {
      "cartId": cartObj.id,
      "qty": qty,
      "price": (cartObj.price) * (qty)
    }
    this.http.postRequestWithToken("api/staff/updateQtyForCart", request).subscribe((data: any) => {
      this.cartService.getCartDetailsByUser();//for updating in the application..
    }, error => {

    })
  }
  removeItem(cartObj: any) {
    if (confirm("Are you sure want to delete..?")) {
      let id = cartObj.id;
      this.cartService.removeCart(id);

    }
  }
  incrementQty(qty: any, cartObj: any) {
    var quantity: any;
    var priceString: any;

    quantity = qty + 1;
    priceString = (cartObj.price) + (cartObj.price / qty)

    var request = {
      "cartId": cartObj.id,
      "qty": quantity,
      "price": priceString
    }
    cartObj.qty = request.qty;
    cartObj.price = request.price;
    // var quantity2 = parseInt(request.qty)

    console.log(request);
    this.http.postRequestWithToken("api/staff/updateQtyForCart", request).subscribe((data: any) => {
      this.cartService.getCartDetailsByUser();//for updating in the application..
    }, error => {
      alert("Error while fetching the cart Details");
    })
  }
  decrementQty(qty: any, cartObj: any) {
    var quantity: any;
    var priceString: any;
    var priceString1: any;
    // quantity = qty-1;
    quantity = qty - 1;
    priceString = (cartObj.price) - (cartObj.price / qty)
    priceString1 = cartObj.price;
    var request = {
      "cartId": cartObj.id,
      "qty": quantity,
      "price": priceString
    }
    cartObj.qty = request.qty;
    cartObj.price = request.price;
    // var quantity2 = parseInt(request.qty)
    if (cartObj.qty < 1) {


      this.cartService.removeCart(cartObj.id);
    }
    this.http.postRequestWithToken("api/staff/updateQtyForCart", request).subscribe((data: any) => {
      this.cartService.getCartDetailsByUser();//for updating in the application..
    }, error => {
      alert("Error while fetching the cart Details");
    })
  }
  onSelected(value:string): void {
		this.selectedTeam = value;
    // alert(this.selectedTeam);
	}
  arrays3: any = [];
  arrays4: any = [];
  checkoutCart() {
    
    var cart_qty: any;
    if (this.http.getToken()) {
      this.cartService.cartServiceEvent.subscribe(data => {
        cart_qty = this.cartService.getQty();
        if(cart_qty ==0){
          this.checkCartQty = false;
        }else{
          this.checkCartQty = true;
        }
        
      })
      
    }
    if (this.noteCheckout == "") {
      this.noteCheckout = "no note";
    }
    
    let request = {
      "total_price": this.cartTotalPrice,
      "pay_type": this.selectedTeam,
      "note": this.noteCheckout,
    }
    if(this.selectedTeam==""){
      request.pay_type = "Mang đi";
    }
    console.log(request);
    if (cart_qty == 0) {
      this.checkCartQty = false;
      var result = confirm("Vui lòng thêm sản phẩm vào giỏ hàng ");
      if (result) {
        window.location.assign('http://localhost:4200/home')
      }
    }else{
      this.checkCartQty = true;
    this.http.postRequestWithToken("api/staff/checkout", request).subscribe((data: any) => {
      this.cartService.getCartDetailsByUser();
      
      this.orderservice.getBill().subscribe
      (data => {
        // console.log(data);
        this.listBill = this.orderpipe.transform(data, 'id');
        this.arrays3 = data;
        console.log("LIST Bill", this.arrays3, typeof this.arrays3);
        this.orderservice.getBillItem().subscribe
        (data2 => {
          // console.log(data);
          this.listBillItem = this.orderpipe.transform(data2, 'product_id');
          this.arrays4 = data2;
          console.log("LIST BillItem", this.arrays4, typeof this.arrays4);
            
        })
      })
      this.moneyFromCus;
      this.moneyPayCus= this.moneyFromCus - this.cartTotalPrice;
    }, error => {
      alert("Error while fetching the cart Details");
    })}

  }
  closeBill(){
    this.moneyFromCus = 0;
    window.location.assign('http://localhost:4200/home')
  }
  
}

