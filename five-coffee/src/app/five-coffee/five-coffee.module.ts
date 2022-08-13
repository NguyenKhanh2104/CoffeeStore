import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FiveCoffeeRoutingModule } from './five-coffee-routing.module';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FilterPipe } from './filter.pipe';
import { BodyHomeComponent } from './component/home/body-home/body-home.component';
import { HeaderHomeComponent } from './component/home/header-home/header-home.component';
import { FooterHomeComponent } from './component/home/footer-home/footer-home.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { HeaderAdminComponent } from './component/admin/header-admin/header-admin.component';
import { OrderComponent } from './component/admin/order/order.component';
import { ProductAdminComponent } from './component/admin/product/product-admin/product-admin.component';
import { SideBarAdminComponent } from './component/admin/side-bar-admin/side-bar-admin.component';
import { StaffAdminComponent } from './component/admin/staff/staff-admin/staff-admin.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchFilterPipe,
    FilterPipe,
    HomeAdminComponent,
    HeaderAdminComponent,
    OrderComponent,
    ProductAdminComponent,
    SideBarAdminComponent,
    StaffAdminComponent,
    BodyHomeComponent,
    HeaderHomeComponent,
    FooterHomeComponent
    
  ],
  imports: [
    CommonModule,
    FiveCoffeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class FiveCoffeeModule { }
