import { NgModule,CUSTOM_ELEMENTS_SCHEMA}  from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiveCoffeeComponent } from './five-coffee/five-coffee.component';
import { HeaderComponent } from './five-coffee/component/admin/header/header.component';
import { BodyComponent } from './five-coffee/component/admin/body/body.component';
import { HeaderHomeComponent } from './five-coffee/component/home/headerHome/headerHome.component';
import { BodyHomeComponent } from './five-coffee/component/home/bodyHome/bodyHome.component';
import { LoginComponent } from './five-coffee/component/form/login/login.component';
import { RegisterComponent } from './five-coffee/component/form/register/register.component';
import { FooterHomeComponent } from './five-coffee/component/home/footerHome/footerHome.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FiveCoffeeComponent,
    HeaderComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    
    FooterHomeComponent,
    HeaderHomeComponent,
    BodyHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
