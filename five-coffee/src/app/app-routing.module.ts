import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// <<<<<<< HEAD
import { BodyComponent } from './five-coffee/component/admin/body/body.component';
import { BodyHomeComponent } from './five-coffee/component/home/bodyHome/bodyHome.component';

const routes: Routes = [
  {path: '',component: BodyHomeComponent},
  {path: 'admin', component: BodyComponent}
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
];
// =======
// import { BodyComponent } from './five-coffee/component/admin/body/body.component';

// const routes: Routes = [{path:'admin',component:BodyComponent}];
// >>>>>>> adminUI

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
