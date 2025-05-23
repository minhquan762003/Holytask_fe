import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  sharedService = inject(SharedService);
  userService = inject(UserService);
  authService = inject(AuthService);
  data :any;
  error :number = 0;

  ngOnInit() {
    if(this.authService.getIsLoggedIn() == "1" ){
      window.location.href = '/dashboard';
    }
  }

  isRemember:boolean = false;
  login(loginRequest:{username:string, password:string}){
    this.userService.login(loginRequest.username, loginRequest.password).subscribe(res=>{
      this.data = res;
      if(this.data.status=="ok"){
        this.error = 0;
        this.authService.setRemember(this.isRemember);
        this.authService.setIsLoggedIn(1);
        this.authService.setToken(this.data.data);
        this.authService.setCurrentUser(this.authService.getUserInformation());
        console.log(this.authService.getCurrentUser());
        console.log(this.isRemember);
        window.location.href = '/dashboard';
      }
    }, error=>{
      console.log(error);
      this.error = 1;
    })
  }

}
