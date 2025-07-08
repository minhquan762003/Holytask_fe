import {Component, inject} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {Parish, SubParish} from "../model/interface-res";

@Component({
  selector: 'app-manager-subparish',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-subparish.component.html',
  styleUrl: './manager-subparish.component.css'
})
export class ManagerSubparishComponent {
  sharedService = inject(SharedService);
  parishes: Parish[] = [];
  subParishes: SubParish[] = [];
  currentSubParish: SubParish = this.getEmptySubParish();
  selectedParishId: number | null = null;
  nextId = 1;

  ngOnInit(): void {
    this.parishes = [
      { id: 1, name: 'Giáo xứ Tân Bình', location: 'TP.HCM' },
      { id: 2, name: 'Giáo xứ Phú Nhuận', location: 'TP.HCM' }
    ];

    this.subParishes = [
      { id: 1, name: 'Giáo họ Mân Côi', parish: this.parishes[0] },
      { id: 2, name: 'Giáo họ Thánh Gia', parish: this.parishes[1] }
    ];

    this.nextId = 3;
  }

  getEmptySubParish(): SubParish {
    return {
      id: 0,
      name: '',
      parish: { id: 0, name: '', location: '' }
    };
  }

  onSubmit(): void {
    const selectedParish = this.parishes.find(p => p.id === this.selectedParishId);
    if (!selectedParish) return;

    if (this.currentSubParish.id === 0) {
      this.currentSubParish.id = this.nextId++;
      this.currentSubParish.parish = selectedParish;
      this.subParishes.push({ ...this.currentSubParish });
    } else {
      const idx = this.subParishes.findIndex(s => s.id === this.currentSubParish.id);
      if (idx !== -1) {
        this.currentSubParish.parish = selectedParish;
        this.subParishes[idx] = { ...this.currentSubParish };
      }
    }

    this.resetForm();
  }

  editSubParish(sub: SubParish): void {
    this.currentSubParish = { ...sub };
    this.selectedParishId = sub.parish.id;
  }

  deleteSubParish(sub: SubParish): void {
    if (confirm(`Xóa giáo họ "${sub.name}"?`)) {
      this.subParishes = this.subParishes.filter(s => s.id !== sub.id);
    }
  }

  resetForm(): void {
    this.currentSubParish = this.getEmptySubParish();
    this.selectedParishId = null;
  }
}
