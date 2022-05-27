import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiveCoffeeComponent } from './five-coffee/five-coffee.component';
import { HeaderComponent } from './five-coffee/component/admin/header/header.component';
import { BodyComponent } from './five-coffee/component/admin/body/body.component';
import { LoginComponent } from './five-coffee/component/form/login/login.component';
import { RegisterComponent } from './five-coffee/component/form/register/register.component';
import { FooterComponent } from './five-coffee/component/home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FiveCoffeeComponent,
    HeaderComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
