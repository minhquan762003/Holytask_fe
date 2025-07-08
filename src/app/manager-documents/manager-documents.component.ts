import {Component, inject} from '@angular/core';
import {DocumentService} from "../service/document.service";
import {Documents, Priest} from "../model/interface-res";
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";

@Component({
  selector: 'app-manager-documents',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-documents.component.html',
  styleUrl: './manager-documents.component.css'
})
export class ManagerDocumentsComponent {

  sharedService = inject(SharedService);
  documents: Documents[] = [
    {
      id: 1,
      fileName: 'document1.pdf',
      originalFileName: 'Bai_giang_Le_ChuaNhat.pdf',
      fileType: 1,
      fileSize: 102400,
      contentType: 'application/pdf',
      downloadUrl: '/files/document1.pdf',
      createdUser: 'admin',
      createdAt: '2025-07-01T10:00:00',
      description: 'Bài giảng Lễ Chúa Nhật',
      deleted: 0,
      priest: {
        id: 1, fullName: 'Lm. Giuse Nguyễn Văn A',
        avatar: '',
        parish: '',
        email: '',
        phone: '',
        address: '',
        joined: '',
        bio: ''
      }
    },
    {
      id: 2,
      fileName: 'doc2.docx',
      originalFileName: 'Thong_bao_sinh_hoat.docx',
      fileType: 2,
      fileSize: 204800,
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      downloadUrl: '/files/doc2.docx',
      createdUser: 'admin',
      createdAt: '2025-07-02T14:30:00',
      description: 'Thông báo sinh hoạt giáo xứ',
      deleted: 0,
      priest: {
        id: 1, fullName: 'Lm. Giuse Nguyễn Văn A',
        avatar: '',
        parish: '',
        email: '',
        phone: '',
        address: '',
        joined: '',
        bio: ''
      }
    },
    {
      id: 3,
      fileName: 'video.mp4',
      originalFileName: 'Giao_ly_thieu_nhi.mp4',
      fileType: 3,
      fileSize: 10485760,
      contentType: 'video/mp4',
      downloadUrl: '/files/video.mp4',
      createdUser: 'admin',
      createdAt: '2025-06-28T09:15:00',
      description: 'Video giáo lý thiếu nhi',
      deleted: 1,
      priest: {
        id: 1, fullName: 'Lm. Giuse Nguyễn Văn A',
        avatar: '',
        parish: '',
        email: '',
        phone: '',
        address: '',
        joined: '',
        bio: ''
      }
    }
  ];


  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();

  }

  loadDocuments(): void {

  }

  onChangeDeleted(doc: Documents): void {

  }

  deleteDocument(doc: Documents): void {
    if (confirm('Bạn có chắc muốn xóa tài liệu này không?')) {
      doc.deleted = 1;
      this.onChangeDeleted(doc);
    }
  }



}
