import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FiveCoffeeRoutingModule } from './five-coffee-routing.module';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FilterPipe } from './filter.pipe';
import { HeaderHomeComponent } from './component/home/headerHome/headerHome.component';
import { FooterHomeComponent } from './component/home/footerHome/footerHome.component';
import { BodyHomeComponent } from './component/home/bodyHome/bodyHome.component';
import { BodyComponent } from './component/admin/body/body.component';
import { HeaderComponent } from './component/admin/header/header.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchFilterPipe,
    FilterPipe,
    HeaderHomeComponent,
    FooterHomeComponent,
    BodyHomeComponent,
    BodyComponent,
    HeaderComponent
    
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
