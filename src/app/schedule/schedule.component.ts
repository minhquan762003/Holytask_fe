import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {AuthService} from "../service/auth.service";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {SharedService} from "../shared-service.service";
import {VisitscheduleService} from "../service/visitschedule.service";
import {ScheduleItem} from "../model/schedule-item";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {WebSocketService} from "../web-socket.service";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './schedule.component.html',
  providers: [ToastrService],
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  authService = inject(AuthService);
  priestProfiles = inject(PriestprofilesService);
  data1: any;
  dataSchedule: any;
  data2: any;
  sharedService = inject(SharedService);
  visitscheduleService = inject(VisitscheduleService);
  priestId: any;
  error = -1;
  lstSchedule = [];
  scheduleList: ScheduleItem[] = [];
  currentPage = 1;
  now = new Date();
  tz7 = new Date(this.now.getTime() - this.now.getTimezoneOffset()*60000 + 7*3600000);
  idVisit: number = -1;
  schedule: any = {
    date: this.tz7.toISOString().slice(0,10),
    time: this.tz7.toISOString().slice(11,16),
    visitType: '-1',
    address: '',
    notes: '',
    headline: ''
  };
  dataEdit: any;

  private notified = new Set<number>();

  ngOnInit(): void {
    this.getPriestProfilesByUserId();
    // this.startScheduleWatcher();
    this.webSocketService.connect();
    this.webSocketService.getMessages().subscribe(notification => {
      console.log(notification);
      if (!this.notified.has(notification.scheduleId)) {
        this.notified.add(notification.scheduleId);

        this.toastr.info(`🔔 ${notification.message}`, notification.headline, {
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });

        const audio = new Audio('/assets/notify.mp3');
        audio.play().catch(err => console.warn('Không thể phát âm thanh:', err));
      }
    });
  }

  notifySchedule(item: any) {
    this.toastr.info(
      `🔔 Còn 5 phút nữa đến giờ công việc!`,                  // Nội dung thông báo
      `${item.headline}`,             // Tiêu đề
      {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        toastClass: 'custom-toast',
        progressBar: true,
        progressAnimation: 'increasing',
      }
    );

    // Optional: phát chuông
    const audio = new Audio('/assets/notify.mp3');
    audio.play().catch(err => console.warn('Không thể phát âm thanh:', err));
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
  constructor(private toastr: ToastrService, private webSocketService: WebSocketService) {
  }

  getPriestProfilesByUserId() {
    this.priestProfiles.getByUserId(this.authService.getCurrentUser()?.id).subscribe(res => {
      this.data1 = res;
      this.priestId = this.data1.data.id;
      this.priestProfiles.setPriestId(this.priestId);
      this.getVisitsByPriestId(this.priestId);
    });
  }

  getVisitsByPriestId(priestId: number) {
    this.visitscheduleService.getVisitsByPriestId(priestId).subscribe(res => {
      this.dataSchedule = res;
      this.lstSchedule = this.dataSchedule.data;

      this.scheduleList = this.lstSchedule as ScheduleItem[];
      for (let i = 0; i < this.scheduleList.length; i++) {
        const badge = this.getBadgeInfo(this.scheduleList[i].visitType);
        this.scheduleList[i].label = badge.label;
        this.scheduleList[i].class = badge.class;
      }

      // Filter by status and today's date
      this.scheduleList = this.scheduleList.filter(item => item.status === 1);

      const today = new Date();
      this.scheduleList = this.scheduleList.filter(item => {
        const itemDate = new Date(item.datetime);
        return (
          itemDate.getDate() === today.getDate() &&
          itemDate.getMonth() === today.getMonth() &&
          itemDate.getFullYear() === today.getFullYear()
        );
      });

      // console.log(this.scheduleList);
    });
  }

  getBadgeInfo(visitType: string): { label: string; class: string } {
    switch (visitType) {
      case 'SICK':
        return {label: 'Viếng bệnh', class: 'bg-info text-dark'};
      case 'BLESSING':
        return {label: 'Ban phép lành', class: 'bg-success'};
      case 'CONFESSION':
        return {label: 'Giải tội', class: 'bg-secondary'};
      case 'CONVENE':
        return {label: 'Triệu tập', class: 'bg-warning text-dark'};
      case 'WEDDING':
        return {label: 'Hôn lễ', class: 'bg-danger'};
      default:
        return {label: 'Khác', class: 'bg-dark'};
    }
  }

  saveSchedule() {
    const datetime = `${this.schedule.date}T${this.schedule.time}:00+07:00`;

    const datamodel = {
      priest: {id: this.data1.data.id},
      visitType: this.schedule.visitType,
      datetime: datetime,
      address: this.schedule.address,
      createdUser: this.authService.getCurrentUser()?.username,
      notes: this.schedule.notes,
      headline: this.schedule.headline
    };

    if (this.idVisit == -1) {
      this.visitscheduleService.addVisitSchedule(datamodel).subscribe(res => {
        console.log(res);
        this.data2 = res;
        if (this.data2.status === "ok") {
          this.error = 0;
          window.location.href = '/schedule';
        }
      }, error => {
        this.error = 1;
      });
    } else {
      console.log(datamodel);
      this.visitscheduleService.updateVisitSchedule(datamodel, this.idVisit).subscribe(res => {
        console.log(res);
        this.data2 = res;
        if (this.data2.status === "ok") {
          this.error = 0;
          window.location.href = '/schedule';
        }
        }, error1 => {
          console.log(error1)
        }
      )
    }
  }

  dateError: string = '';
  timeError: string = '';

  validateDateTime() {
    this.dateError = '';
    this.timeError = '';

    if (!this.schedule.date) return;

    const today = new Date();
    const selectedDate = new Date(this.schedule.date);

    // Clear the time part for comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.dateError = this.sharedService.getTranslateService().translate('label.date.phai_lon_hon_hientai');
      return;
    }

    // If today, check time
    if (selectedDate.getTime() === today.getTime()) {
      if (!this.schedule.time) return;

      const [hours, minutes] = this.schedule.time.split(':').map(Number);
      const now = new Date();

      if (hours < now.getHours() || (hours === now.getHours() && minutes <= now.getMinutes())) {
        this.timeError = this.sharedService.getTranslateService().translate('label.time.phai_lon_hon_hientai');
      }
    }
  }

  startScheduleWatcher() {
    setInterval(() => {
      const now = Date.now();                  // milliseconds hiện tại

      this.scheduleList.forEach(item => {
        const taskTime = new Date(item.datetime).getTime();   // ms của lịch hẹn
        const diffMin = (taskTime - now) / 60_000;           // chênh lệch phút

        // Còn từ 0 đến < 5 phút và chưa thông báo
        if (diffMin >= 0 && diffMin < 5 && !this.notified.has(item.id)) {
          this.notifySchedule(item);
          this.visitscheduleService.sendEmail(item.id, this.authService.getCurrentUser()?.email).subscribe();
          this.notified.add(item.id);          // đánh dấu đã nhắc
        }
      });
    }, 60_000); // kiểm tra mỗi phút
    int
  }



  edit(id: number) {
    this.idVisit = id;
    this.visitscheduleService.getByIdVisit(this.idVisit).subscribe(res => {
      this.dataEdit = res;
      const dt = new Date(this.dataEdit.data.datetime)
      this.schedule.date = dt.toISOString().substring(0, 10);
      this.schedule.time = dt.toTimeString().substring(0, 5);
      this.schedule.headline = this.dataEdit.data.headline;
      this.schedule.address = this.dataEdit.data.address;
      this.schedule.notes = this.dataEdit.data.notes;
      this.schedule.visitType = this.dataEdit.data.visitType;
    }, error1 => {
      console.log(error1)
    });
  }

  resetInputAddSchedule() {
    this.idVisit = -1;
    this.schedule.headline = '';
    this.schedule.notes = '';
    this.schedule.address = '';
    this.schedule.visitType = '-1';
    this.schedule.date = this.now.toISOString().substring(0, 10);
    this.schedule.time = this.now.toTimeString().substring(0, 5);
  }
  dataDelete:any;
  delete(id:number){
    this.visitscheduleService.deleteVisitSchedule(id).subscribe(res=>{
      this.dataDelete = res;
      if(this.dataDelete.status == "ok"){
        this.error = 0;
      }else {
        this.error = 1;
      }
      window.location.href = '/schedule';
    },error1 => {
      console.log(error1);
    })
  }

}
