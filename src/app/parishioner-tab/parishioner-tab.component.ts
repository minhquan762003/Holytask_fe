import {Component, inject, OnInit} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {SharedModule} from "../shared/shared.module";
import {SubparishService} from "../service/subparish.service";
import {ParishGroup, ParishionerProfile, PriestProfile, SubParish} from "../model/interface-res";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {AuthService} from "../service/auth.service";
import {ParishionerService} from "../service/parishioner.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-parishioner-tab',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './parishioner-tab.component.html',
  styleUrl: './parishioner-tab.component.css'
})
export class ParishionerTabComponent implements OnInit{
  sharedService=inject(SharedService);
  subparishService = inject(SubparishService);
  priestprofilesService = inject(PriestprofilesService);
  authService = inject(AuthService);
  data1: any;
  data:any;
  priestProfile: PriestProfile|undefined;
  parishId:number = -1;
  lstParishGroup:ParishGroup[]=[];
  isSubmitted = false;
  lstSubParish:SubParish[] = [];
  parishionerService = inject(ParishionerService);
  error = undefined;
  userName :string|undefined;
  lstParishioners : ParishionerProfile[] = [];
  groupIdFind = -1;
  selectedParishioner : ParishionerProfile |undefined;
  personId:number = -1;
  nameFind:string = "";
  currentPage = 1;
  isSaving: boolean = false;

  parishioners = {
    id:-1,
    fullName: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    imgUrl: "",
    parishGroupId: -1,
    subParishId:-1,
    createdUser: ""
  };


  ngOnInit(): void {
    this.priestprofilesService.getByUserId(this.authService.getCurrentUser()?.id)
      .subscribe(res => {
        this.data1 = res;
        this.priestProfile = this.data1.data as PriestProfile;
        this.parishId = this.priestProfile.parish?.id as number;
        console.log('Parish ID:', this.parishId);

        if (this.parishId != undefined && this.parishId != -1) {
          this.subparishService.getByParishId(this.parishId).subscribe(res => {
            this.data = res;
            this.data =  this.data.data;
            this.lstSubParish = this.data as SubParish[];
            console.log(this.lstSubParish);
          });

          this.parishionerService.getByParishId(this.parishId).subscribe( res => {
            console.log(res);
            this.data = res;
            this.data = this.data.data;
            this.lstParishioners = this.data as ParishionerProfile[];
          })
        }
      });
    this.subparishService.getAllGroups().subscribe(res=>{
      this.data = res;
      this.data = this.data.data;
      this.lstParishGroup = this.data as ParishGroup[];
    })
  }

  onSelectSubParish(event:Event):void{
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected SubParish ID:', selectedValue);
    const subParishId = Number(selectedValue);
  }


  selectedAvatarFile: File | null = null;
  avatarPreviewUrl: string | null = null;
  onAvatarSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatarFile = file;

      // Hiển thị preview tạm thời
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  getParishioners() {
    const name = this.nameFind.trim();

    // 1. Tìm tất cả (không lọc gì)
    if (this.groupIdFind == -1 && name === "") {
      this.parishionerService.getByParishId(this.parishId).subscribe(res => {
        this.data = res;
        this.data = this.data.data
        this.lstParishioners = this.data as ParishionerProfile[];
      });

      // 2. Tìm theo tên (không cần hội đoàn)
    } else if (this.groupIdFind == -1 && name !== "") {
      this.parishionerService.getByParishIdAndGroupId(this.parishId, -1, name).subscribe(res => {
        this.data = res;
        this.data = this.data.data
        this.lstParishioners = this.data as ParishionerProfile[];
      });

      // 3. Tìm theo hội đoàn (không có tên)
    } else if (this.groupIdFind != -1 && name === "") {
      this.parishionerService.getByParishIdAndGroupId(this.parishId, this.groupIdFind, "null").subscribe(res => {
        this.data = res;
        this.data = this.data.data
        this.lstParishioners = this.data as ParishionerProfile[];
      });

      // 4. Tìm theo cả tên và hội đoàn
    } else {
      this.parishionerService.getByParishIdAndGroupId(this.parishId, this.groupIdFind, name).subscribe(res => {
        this.data = res;
        this.data = this.data.data
        this.lstParishioners = this.data as ParishionerProfile[];
      });
    }
  }


// luu thong tin giao dan
  save(): void {
    console.log(123);
    if (this.isSaving) return;
    this.error = undefined;
    if (this.selectedAvatarFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];

        // Upload ảnh trước, sau đó lưu dữ liệu
        this.priestprofilesService.uploadToImgBB(base64String).subscribe(res => {
          this.data1 = res;
          this.parishioners.imgUrl = this.data1.data.url; // cập nhật avatar
          this.doSave(); // gọi hàm thực hiện lưu dữ liệu
        });
      };
      reader.readAsDataURL(this.selectedAvatarFile);
      setTimeout(() => {
        this.isSaving = false;
      }, 5000);
    } else {
      this.doSave();
      setTimeout(() => {
        this.isSaving = false;
      }, 5000);
    }
  }

  doSave(): void {
    // console.log(this.parishioners);
    this.userName = this.authService.getCurrentUser()?.username.toString();
    if(this.userName != undefined){
      this.parishioners.createdUser = this.userName;
    }
    this.isSubmitted = true;
    if (this.personId == -1) {
      this.parishionerService.createParishioner(this.parishioners).subscribe(res => {
        this.data = res;
        if (this.data.status == 'ok') {
          window.location.href = '/parishioner';
        }
      }, error => {
        console.log(error);
        this.error = error.error.message;
      });
    } else {
      this.error = undefined;
      console.log(this.parishioners);
      //set gia tri cho doi tuong gui len back end
      this.parishionerService.updateParishioner(this.parishioners).subscribe(res => {
        this.data = res;
        if (this.data.status == 'ok') {
          window.location.href = '/parishioner';
        }
      }, error1 => {
        console.log(error1);
        this.error = error1.error.message;
      })
      this.personId = -1;
    }
  }
//
  changeGroupId(event:any){
    this.groupIdFind = event.target.value;
  }

  onChangeNameFind(event:any){
    this.nameFind = event.target.value;
  }
// CRUD
  viewDetail(person:ParishionerProfile){
    this.selectedParishioner = person;
    this.parishionerService.setViewDate(person.id).subscribe(res=>{
      console.log(res);
    })
  }
  editPerson(person:ParishionerProfile){
    this.personId = person.id;
    console.log(this.personId);
    this.selectedParishioner = person;
    this.parishioners.id = this.personId;
    const rawDate = person.dateOfBirth.toString();
    const formatted = rawDate.slice(0, 10);
    this.selectedParishioner = person;
    this.parishioners.fullName = person.fullName;
    this.parishioners.birthDate = formatted;
    this.parishioners.address = person.address;
    this.parishioners.phoneNumber = person.phoneNumber;
    this.parishioners.imgUrl = person.imgUrl;
    this.parishioners.parishGroupId = person.parishGroup.id;
    this.parishioners.subParishId = person.subParish.id;
  }

  deletePerson(person:ParishionerProfile){
    this.selectedParishioner = person;
  }

  confirmDelete(id:number|undefined){
    if(id){
      this.parishionerService.deleteParishioner(id).subscribe(res=>{
        this.data = res;
        if (this.data.status == 'ok') {
          window.location.href = '/parishioner';
        }
      },error=>{
        this.error =  error.error.message;
      })
    }else {
      this.error = "Không có id sản phẩm để xóa" as any;
      return;
    }
  }

//



}
