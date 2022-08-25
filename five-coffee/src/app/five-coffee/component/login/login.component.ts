import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  checkLoggedInStaff = false;
  checkLoggedInAdmin = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  msg:any;
  constructor(private router:Router,private route:ActivatedRoute, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      for (let index = 0; index < this.roles.length; index++) {

        if (this.roles[index] == 'ROLE_USER') {
          this.checkLoggedInStaff = true;
          this.checkLoggedInAdmin = false;
          // window.location.assign('http://localhost:4200/home')
        }
        if (this.roles[index] == 'ROLE_ADMIN') {
          this.checkLoggedInAdmin = true;
          this.checkLoggedInStaff = false;
          // window.location.assign('http://localhost:4200/admin')
        }
      }
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        for (let index = 0; index < this.roles.length; index++) {

          if (this.roles[index] == 'ROLE_USER') {
            this.checkLoggedInStaff = true;
            this.checkLoggedInAdmin = false;
            window.location.assign('http://localhost:4200/home')
          }
          if (this.roles[index] == 'ROLE_ADMIN') {
            this.checkLoggedInAdmin = true;
            this.checkLoggedInStaff = false;
            window.location.assign('http://localhost:4200/admin')
          }
        }
        
      },
      err => {
        this.errorMessage = err.error.message;
        // this.msg = "usename hoăc password chưa đúng"
        // this.msg = "Username or password incorrect"
          this.isLoginFailed = true;
      }
    );
  }

  reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['home']);
    }

}
