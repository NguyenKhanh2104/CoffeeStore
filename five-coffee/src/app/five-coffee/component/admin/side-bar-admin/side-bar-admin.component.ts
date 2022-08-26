import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbDayTemplateData } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { TokenStorageService } from 'src/app/five-coffee/service/token-storage.service';
import { UserService } from 'src/app/five-coffee/service/user.service';

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})
export class SideBarAdminComponent implements OnInit {
  isLoggedIn = false;
  roles: string[] = [];
  username!: string;
  imageUser : any;
  id : any;
  constructor(private userService:UserService,private router: Router, private route: ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.id = user.id;
  
      this.imageUser = this.userService.getImageUser(this.id);
      console.log("id là "+this.id)
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
