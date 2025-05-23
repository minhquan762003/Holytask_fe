import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {UserService} from "../service/user.service";
import {SharedService} from "../shared-service.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userService = inject(UserService);
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  responseData:any;
  error :number = 0;

  ngOnInit() {
    if(this.authService.getIsLoggedIn() == "1"){
      window.location.href = '/dashboard';
    }
  }

  register(data :{username:String, passwordHash:String, email:String, fullName:String}){
    console.log(data);
    this.userService.register(data).subscribe(
      res => {
        this.responseData = res;
        if(this.responseData.status == "ok"){
          this.error = 0;
          window.location.href = '/login';
        }
      },
      err => {
        console.log(err);
        this.error = 1;
      }
    );
  }
}
