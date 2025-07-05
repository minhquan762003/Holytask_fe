import {Component, inject, OnInit} from '@angular/core';
import {User} from "../model/interface-res";
import {SharedModule} from "../shared/shared.module";
import {UserService} from "../service/user.service";
import {SharedService} from "../shared-service.service";

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit{
  userList: User[] = [];
  userService = inject(UserService);
  resData :any;
  sharedService = inject(SharedService)


  roleOptions: string[] = ['ADMIN', 'PRIEST'];

  ngOnInit() {
    this.userService.getAllUser().subscribe(res=>{
      this.resData = res;
      this.resData = this.resData.data;
      this.userList = this.resData as User[];
    })
  }

  updateUser(user: User) {
    console.log('Update user:', user);
    this.userService.updateUser(user).subscribe(res=>{
      console.log(res);
      window.location.href = '/usersManager';
    })
  }
}
