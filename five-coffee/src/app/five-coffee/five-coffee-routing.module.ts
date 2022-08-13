import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BodyHomeComponent } from './component/home/body-home/body-home.component';
import { HomeAdminComponent } from './component/admin/home-admin/home-admin.component';
import { StaffAdminComponent } from './component/admin/staff/staff-admin/staff-admin.component';
import { ProductAdminComponent } from './component/admin/product/product-admin/product-admin.component';
import { OrderComponent } from './component/admin/order/order.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: HomeAdminComponent},
  {path: 'admin/staff', component: StaffAdminComponent},
  {path: 'admin/product', component: ProductAdminComponent},
  {path: 'admin/order', component: OrderComponent},
  {path:'profile',component:ProfileComponent},
  {path:'home',component:BodyHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),NgxPaginationModule],
  exports: [RouterModule,NgxPaginationModule]
})
export class FiveCoffeeRoutingModule { }
