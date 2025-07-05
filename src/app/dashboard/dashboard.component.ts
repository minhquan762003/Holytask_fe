import {Component, inject, OnInit} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {SharedModule} from "../shared/shared.module";
import {CalendarComponent} from "./calendar/calendar.component";
import {EventComponent} from "./event/event.component";
import {ParishionerComponent} from "./parishioner/parishioner.component";
import {AuthService} from "../service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, CalendarComponent, EventComponent, ParishionerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  ngOnInit(): void {
    if(this.authService.getCurrentUser() == null){
      this.authService.setIsLoggedIn(0);
      window.location.href = '/login';
    }else {
      if(this.authService.getCurrentUser()?.role == 'ADMIN'){
        window.location.href = '/usersManager';
      }
      this.notifyLoginOnce();
    }
  }

  constructor(private toastr: ToastrService) {
  }
  private notifyLoginOnce(): void {
    // nếu đã thông báo thì thôi
    if (sessionStorage.getItem('loginToastShown') === '1') { return; }

    // đánh dấu đã thông báo
    sessionStorage.setItem('loginToastShown', '1');

    // gọi toast
    this.toastr.info(
      '',
      '🔔 Đăng nhập thành công ',
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        toastClass: 'custom-toast1',
        progressBar: true,
        progressAnimation: 'increasing',
      }
    );
  }

}
