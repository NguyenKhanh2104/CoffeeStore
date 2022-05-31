import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { BodyComponent } from './five-coffee/component/admin/body/body.component';
import { BodyComponent } from './five-coffee/component/home/body/body.component';

const routes: Routes = [
  {path: '',component: BodyComponent},
  // {path: 'admin', component: BodyComponentHome}
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
