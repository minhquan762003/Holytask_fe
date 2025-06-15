import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared-service.service";
import {start} from "@popperjs/core";
import {VisitscheduleService} from "../../service/visitschedule.service";
import {ScheduleItem} from "../../model/interface-res";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  sharedService = inject(SharedService);
  visitScheduleService = inject(VisitscheduleService);
  selectedDate: string = "";
  data:any;
  scheduleList: ScheduleItem[] = [];

  currentPage = 1;
  itemsPerPage = 3;

  get totalPages(): number {
    return Math.ceil(this.scheduleList.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.scheduleList.slice(start, start + this.itemsPerPage);
  }

  get totalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  ngOnInit(): void {
    // Gán ngày hiện tại khi component khởi tạo
    const today = new Date();
    this.selectedDate = today.toLocaleDateString('vi-VN');

    // Gọi API với ngày hôm nay
    this.visitScheduleService.getByDate(this.selectedDate).subscribe(res => {
      this.data = res;
      this.data = this.data.data;
      this.scheduleList = this.data as ScheduleItem[];
    });

    // Lắng nghe khi user click ngày khác
    this.sharedService.dayClicked$.subscribe(selectedDate => {
      if (selectedDate) {
        this.selectedDate = selectedDate;
        this.visitScheduleService.getByDate(this.selectedDate).subscribe(res => {
          this.data = res;
          this.data = this.data.data ;
          this.scheduleList = this.data as ScheduleItem[];
        });
      }
    });
  }


}
