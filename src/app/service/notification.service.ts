import {inject, Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";
import {VisitscheduleService} from "./visitschedule.service";
import {ScheduleItem} from "../model/interface-res";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notified = new Set<number>();
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  visitScheduleService = inject(VisitscheduleService);
  foundVisitSchedule:ScheduleItem|undefined;
  resData:any;

  constructor(private toastr: ToastrService) {
  }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  handleNotification(notification: any): void {
    console.log(notification);
    if (!this.notified.has(notification.scheduleId)) {


      this.toastr.info(`🔔 ${notification.message}`, ` ${notification.headline}`, {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        toastClass: 'custom-toast',
        progressBar: true,
        progressAnimation: 'increasing'
      });
      this.sendEmail(notification.scheduleId, this.authService.getCurrentUser()?.email).subscribe(res=>{
        console.log(res);
      })
      this.visitScheduleService.getById(notification.scheduleId).subscribe(res=>{
        console.log(res);
        this.resData = res;
        this.resData = this.resData.data
        this.foundVisitSchedule = this.resData as ScheduleItem;
        //kiểm tra đã done việc hay chưa rồi mới gửi cho backend
        console.log(this.foundVisitSchedule);
        if(this.foundVisitSchedule != undefined && (this.foundVisitSchedule.status == 2 ) ){
          this.notified.add(notification.scheduleId);
          this.confirmNotification(notification.scheduleId);
        }
      });

      const audio = new Audio('/assets/notify.mp3');
      audio.play().catch(err => console.warn('Không thể phát âm thanh:', err));
    }
  }

  confirmNotification(scheduleId: number) {
    const headers = this.createHeaders();
    this.sharedService.getHttp().post(
      `${this.sharedService.getBaseUrl()}/notification/ack`,
      {scheduleId},
      {headers}
    ).subscribe({
      next: () => console.log('Đã xác nhận lịch đã nhận'),
      error: err => console.error('Lỗi xác nhận lịch:', err)
    });
  }

  sendEmail(idVisit: number, email: any) {
    const headers = this.createHeaders();
    const body = { email, idVisit };
    return this.sharedService.getHttp().post(
      `http://localhost:8080/api/visitSchedule/sendEmail`,
      body,
      { headers }
    );
  }


}
