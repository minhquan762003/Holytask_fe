import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {SharedService} from "../shared-service.service";
import {DatePipe} from "@angular/common";
import {UserService} from "../service/user.service";
import {ParishService} from "../service/parish.service";
import {SharedModule} from "../shared/shared.module";
import {ToastrService} from "ngx-toastr";
import {Parish, PriestProfile, User} from "../model/interface-res";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-priest-profile',
  standalone: true,
  imports: [
    DatePipe,
    SharedModule
  ],
  templateUrl: './priest-profile.component.html',
  styleUrl: './priest-profile.component.css'
})
export class PriestProfileComponent implements OnInit{
  authService = inject(AuthService);
  priestprofilesService = inject(PriestprofilesService);
  data1: any;
  sharedService = inject(SharedService);
  priestProfile: PriestProfile|undefined;
  userData : User|undefined;
  userService = inject(UserService);
  userId: number | undefined;
  parishService = inject(ParishService);
  parishData:Parish|undefined;
  parishId:number|undefined;
  lstParish: Parish[] = [];
  error:any = undefined;
  dataEdit: any = {
    fullName: '',
    avatar: '',       // user.profilePictureUrl
    parishId: '',       // parish.name
    email: '',        // user.email
    phone: '',        // cần thêm field
    address: '',      // cần thêm field
    joined: '',       // ordinationDate
    bio: '',
    ordinationDate:''
  };


  ngOnInit(): void {
    this.getPriestProfilesByUserId();
    this.getUserById();
    this.parishService.findAllParish().subscribe(res=>{
      this.data1 = res;
      this.data1 = this.data1.data;
      this.lstParish = this.data1 as Parish[];
    })
  }

  onSelectParish(event:Event):void{
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected SubParish ID:', selectedValue);
    const subParishId = Number(selectedValue);
  }

  getPriestProfilesByUserId() {
    this.priestprofilesService.getByUserId(this.authService.getCurrentUser()?.id).subscribe(res => {
      this.data1 = res;
      if(this.data1.data != undefined){
        this.priestProfile = this.data1.data as PriestProfile;
        this.parishId = this.priestProfile.parish?.id as number;
        if(this.parishId!=undefined){
          this.getParishByParishId(this.parishId);
        }
      }
    });
  }

  getUserById(){
    this.userId = this.authService.getCurrentUser()?.id as number;
    this.userService.getUserById(this.userId).subscribe(res=>{
      this.data1 = res;
      this.userData = this.data1.data as User;
      console.log(this.userData.profilePictureUrl)
    });
  }

  getParishByParishId(parishId:number){
    this.parishService.findByParishId(parishId).subscribe(res=>{
      this.data1 = res;
      this.parishData = this.data1.data as Parish;
      // console.log(this.data1);
    })
  }

  formatPhoneNumber(phone: any): string {
    if (!phone) return '';
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  edit(){
    this.dataEdit.fullName = this.priestProfile?.fullName;
    this.dataEdit.ordinationDate = this.getDateOnly(this.priestProfile?.ordinationDate);
    this.dataEdit.email = this.userData?.email;
    this.dataEdit.phone = this.userData?.phoneNumber;
    this.dataEdit.address = this.parishData?.location;
    this.dataEdit.avatar = this.userData?.profilePictureUrl;
    this.dataEdit.parishId = this.parishData?.id;
  }

  getDateOnly(dateString: any): string {
    if (!dateString) return '';

    const dateOnly = dateString.split('T')[0];
    console.log('Input:', dateString);
    console.log('Extracted Date:', dateOnly);

    return dateOnly;
  }


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


  selectedAvatarFile: File | null = null;
  avatarPreviewUrl: string | null = null;
  save(): void {
    console.log(123);
    if (this.selectedAvatarFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];

        // Upload ảnh trước, sau đó lưu dữ liệu
        this.priestprofilesService.uploadToImgBB(base64String).subscribe(res => {
          this.data1 = res;
          this.dataEdit.avatar = this.data1.data.url; // cập nhật avatar
          this.doSave(); // gọi hàm thực hiện lưu dữ liệu
        });
      };
      reader.readAsDataURL(this.selectedAvatarFile);
    } else {
      // Không chọn ảnh mới, dùng avatar cũ
      this.doSave();
    }
  }

  doSave(): void {
    console.log(this.dataEdit);
    this.userId = this.authService.getCurrentUser()?.id as number;
    this.priestprofilesService.updateProfile(this.dataEdit, this.userId).subscribe(res=>{
      this.data1 = res;
      if(this.data1.status == "ok"){
        this.notify("Lưu dữ liệu thành công", "success-toast");
        window.location.href = '/priestProfile';
      }else {
        this.notify("Lưu dữ liệu thất bại", "error-toast")
      }
    });

  }

  constructor(private toastr: ToastrService) {
  }
  private notify( mess:any, typeToast:any): void {
    // nếu đã thông báo thì thôi
    if (sessionStorage.getItem('loginToastShown') === '1') { return; }

    // đánh dấu đã thông báo
    sessionStorage.setItem('loginToastShown', '1');

    // gọi toast
    this.toastr.info(
      '',
      `🔔 ${mess} `,
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        toastClass: `${typeToast}`,
        progressBar: true,
        progressAnimation: 'increasing',
      }
    );
  }


  passwordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  passwordMismatch = false;


  submitChangePassword(): void {
    this.passwordMismatch = this.passwordData.newPassword !== this.passwordData.confirmPassword;

    if (this.passwordMismatch) {
      return;
    }

    const payload = {
      oldPassword: this.passwordData.oldPassword,
      newPassword: this.passwordData.newPassword
    };
    this.userId = this.authService.getCurrentUser()?.id;
    if(this.userId !=undefined){
      this.userService.resetPass(this.userId,payload).subscribe({
        next: () => {
          alert('Đổi mật khẩu thành công!');
          this.resetPasswordForm();
        },
        error: (err ) => {
          this.error = err;
          this.error = this.error.error.message;
        }
      });
    }
  }

  resetPasswordForm(): void {
    this.passwordData = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.passwordMismatch = false;
  }
}
