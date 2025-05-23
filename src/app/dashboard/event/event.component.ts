import {Component, inject} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared-service.service";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  sharedService = inject(SharedService);
  items = [{id: 1, name: 'Wedding', description: 'đám cưới'}, {
    id: 2,
    name: 'thánh lễ',
    time: "",
    description: 'thánh lễ lá'
  }, {id: 2, name: 'thánh lễ', time: "", description: 'thánh lễ lá'},
    {id: 2, name: 'thánh lễ', time: "", description: 'thánh lễ lá'},
    {id: 2, name: 'thánh lễ', time: "", description: 'thánh lễ lá'}];


  currentPage = 1;
  itemsPerPage = 3;

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + this.itemsPerPage);
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
}
