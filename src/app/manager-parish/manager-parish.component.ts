import {Component, inject} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {Parish} from "../model/interface-res";

@Component({
  selector: 'app-manager-parish',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-parish.component.html',
  styleUrl: './manager-parish.component.css'
})
export class ManagerParishComponent {
  sharedService = inject(SharedService);
  parishes: Parish[] = [];
  currentParish: Parish = this.getEmptyParish();
  nextId = 1;

  ngOnInit(): void {
    // Khởi tạo dữ liệu test
    this.parishes = [
      {
        id: 1,
        name: 'Giáo xứ Tân Bình',
        location: 'Quận Tân Bình, TP.HCM',
        createdAt: '2025-07-01',
        updatedAt: '2025-07-01'
      },
      {
        id: 2,
        name: 'Giáo xứ Phú Nhuận',
        location: 'Quận Phú Nhuận, TP.HCM',
        createdAt: '2025-07-02',
        updatedAt: '2025-07-02'
      }
    ];
    this.nextId = 3;
  }

  getEmptyParish(): Parish {
    return {
      id: 0,
      name: '',
      location: '',
      createdAt: '',
      updatedAt: ''
    };
  }

  onSubmit(): void {
    const now = new Date().toISOString().split('T')[0];

    if (this.currentParish.id === 0) {
      // Thêm mới
      this.currentParish.id = this.nextId++;
      this.currentParish.createdAt = now;
      this.currentParish.updatedAt = now;
      this.parishes.push({ ...this.currentParish });
    } else {
      // Cập nhật
      const index = this.parishes.findIndex(p => p.id === this.currentParish.id);
      if (index !== -1) {
        this.currentParish.updatedAt = now;
        this.parishes[index] = { ...this.currentParish };
      }
    }

    this.currentParish = this.getEmptyParish();
  }

  editParish(parish: Parish): void {
    this.currentParish = { ...parish };
  }

  deleteParish(parish: Parish): void {
    if (confirm(`Bạn có chắc muốn xóa giáo xứ "${parish.name}"?`)) {
      this.parishes = this.parishes.filter(p => p.id !== parish.id);
    }
  }

}
