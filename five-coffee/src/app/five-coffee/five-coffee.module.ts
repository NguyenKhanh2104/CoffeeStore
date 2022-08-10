import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FiveCoffeeRoutingModule } from './five-coffee-routing.module';
import { ProfileComponent } from './component/profile/profile.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FilterPipe } from './filter.pipe';
import { BodyComponent } from './component/admin/body/body.component';
import { HeaderComponent } from './component/admin/header/header.component';
import { BodyHomeComponent } from './component/home/body-home/body-home.component';
import { HeaderHomeComponent } from './component/home/header-home/header-home.component';
import { FooterHomeComponent } from './component/home/footer-home/footer-home.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SearchFilterPipe,
    FilterPipe,
    BodyHomeComponent,
    HeaderHomeComponent,
    FooterHomeComponent,
    HeaderComponent,
    BodyComponent
    
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
