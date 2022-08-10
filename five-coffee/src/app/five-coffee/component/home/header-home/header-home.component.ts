import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/five-coffee/service/token-storage.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  isLoggedIn = false;
  username!: string;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

}
