import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BodyComponent } from './component/admin/body/body.component';
import { BodyHomeComponent } from './component/home/body-home/body-home.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: BodyComponent},
  {path:'profile',component:ProfileComponent},
  {path:'home',component:BodyHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),NgxPaginationModule],
  exports: [RouterModule,NgxPaginationModule]
})
export class FiveCoffeeRoutingModule { }
