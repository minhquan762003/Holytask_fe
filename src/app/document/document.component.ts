import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedService} from "../shared-service.service";
import {SharedModule} from "../shared/shared.module";
import {DocumentService} from "../service/document.service";
import {Documents, PriestProfile} from "../model/interface-res";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent implements OnInit{
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  uploading = false;
  sharedService = inject(SharedService);
  selectedType:number = -1 ;
  documentService = inject(DocumentService);
  priestId:number = -1;
  lstDoc:Documents[] = [];
  resData:any;
  priestprofilesService = inject(PriestprofilesService);
  authService = inject(AuthService);

  selectedDoc:Documents|undefined;
  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      fileType: ['', Validators.required],
      description: ['']
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
  }

  uploadDocument(): void {
    if (!this.selectedFile || this.uploadForm.invalid) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileType', this.uploadForm.value.fileType);
    formData.append('description', this.uploadForm.value.description);

    this.uploading = true;

    this.documentService.uploadFile(formData).subscribe({
      next: (res) => {
        // alert('✅ Tải lên thành công!');
        console.log(res);
        this.uploading = false;
        // reload data...
        window.location.href = '/document';

      },
      error: (err) => {

        console.log(err);
        this.uploading = false;
      }
    });
  }

  onSelectFileType(event:any){
    this.selectedType = event.target.value;
    console.log(this.selectedType);
  }

  ngOnInit(): void {

    this.priestprofilesService.getByUserId(this.authService.getCurrentUser()?.id)
      .subscribe(res => {
        this.resData = res;
        if(this.resData.data.id != undefined){
          this.priestId = this.resData.data.id;

          if (this.priestId != -1) {
            this.documentService.getDocByPriestId(this.priestId).subscribe({
              next: (res) => {
                this.resData = res;
                this.resData = this.resData.data;
                this.lstDoc = this.resData as Documents[];

              }, error: (error) => {
                console.log(error);
                this.uploading = false;
              }
            });


          }
        }
      });
  }


  getFileTypeLabel(type: number): string {
    switch (type) {
      case 1: return 'Biên bản';
      case 2: return 'Giáo lý';
      // case 3: return 'Thông báo';
      default: return 'Tài liệu khác';
    }
  }

  getBadgeClass(type: number): string {
    switch (type) {
      case 1: return 'bg-secondary';
      case 2: return 'bg-success';
      case 3: return 'bg-warning';
      default: return 'bg-dark';
    }
  }

  viewDocument(doc: Documents) {
    const previewUrl = `${doc.downloadUrl}?preview=true`;
    this.documentService.downloadDoc(previewUrl).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        console.error('Không thể xem trước file:', err);
        alert('❌ Lỗi khi xem trước tài liệu');
      }
    });
  }



  deleteDocument() {
    if(this.selectedDoc!=undefined){
      this.documentService.deleteDocById(this.selectedDoc.id).subscribe(
        {
          next:(res)=>{
            console.log(res);
            window.location.href = '/document';

          },

          error:(err)=>{
            console.log(err);
          }

        }
      );
    }
  }

  setDocToDelete(doc:Documents) {
    this.selectedDoc = doc;
  }

  downloadDoc(downloadUrl: string, originalFileName: string) {
    this.documentService.downloadDoc(downloadUrl).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalFileName || 'file';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Lỗi tải file:', err);
        alert('❌ Không thể tải file');
      }
    });
  }

  findDocByName(event:any){
    const name = event.target.value;
    this.documentService.findDocByName(name).subscribe({
      next: (res)=>{
        this.resData = res;
        this.resData = this.resData.data;
        this.lstDoc = this.resData as Documents[];
        console.log(this.lstDoc);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


}
