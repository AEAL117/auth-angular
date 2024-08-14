import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import {HttpClient} from "@angular/common/http";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss']
})
export class SecuredComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  http = inject(HttpClient);

  logout() {
    this.authService.logout()
  }

  get username(): string {
    return this.authService.getUsername();
  }

   accestoken(): string{
      let accestoken=this.authService.getAccessToken();
      this.userService.getUsers(accestoken);
      
    return accestoken;
  }

 
  ngOnInit(): void {
    this.userService.getCsrf();
    this.http.get<string>('/api/secured').subscribe(console.log)
  }
}