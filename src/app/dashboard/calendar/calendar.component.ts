import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared-service.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  currentDate: Date = new Date();
  weeks: any[] = [];
  selectedDate: Date = new Date();
  sharedService = inject(SharedService);
  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Ngày đầu tiên trong tháng
    const firstDay = new Date(year, month, 1);
    // Ngày cuối cùng trong tháng
    const lastDay = new Date(year, month + 1, 0);

    const calendar: any[] = [];
    let week: any[] = [];

    // Tính khoảng trống đầu tuần
    const startDay = firstDay.getDay();

    // Push các ô rỗng đầu tiên
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      week.push(new Date(year, month, d));
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Nếu còn dư ngày cuối
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    this.weeks = calendar;
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getMonthYear(): string {
    return this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
  }

  onDayClick(date:Date){
    const rawDate = new Date(date);

    const formattedDate = rawDate.toLocaleDateString('vi-VN'); // Output: "17/06/2025"
    console.log(formattedDate);
    rawDate.getDay();
    if (date) {
      this.selectedDate = date;
    }
    this.sharedService.emitDayClicked(formattedDate);
  }

  isSelected(day: Date): boolean {
    return day && this.selectedDate &&
      day.getDate() === this.selectedDate.getDate() &&
      day.getMonth() === this.selectedDate.getMonth() &&
      day.getFullYear() === this.selectedDate.getFullYear();
  }
}
