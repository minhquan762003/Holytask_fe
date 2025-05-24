import {inject, Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notified = new Set<number>();
  sharedService = inject(SharedService);
  authService = inject(AuthService);

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
      this.notified.add(notification.scheduleId);

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
      this.confirmNotification(notification.scheduleId);
      const audio = new Audio('/assets/notify.mp3');
      audio.play().catch(err => console.warn('Không thể phát âm thanh:', err));
    }
  }

  confirmNotification(scheduleId: number) {
    const headers = this.createHeaders();
    this.sharedService.getHttp().post(
      `${this.sharedService.getBaseUrl()}/notification/ack`,
      {scheduleId}, // ✅ gửi object đúng định dạng
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
