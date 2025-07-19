import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {Parish} from "../model/interface-res";
import {ParishService} from "../service/parish.service";
import {ManagerParishService} from "../service/manager-parish.service";

@Component({
  selector: 'app-manager-parish',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-parish.component.html',
  styleUrl: './manager-parish.component.css'
})
export class ManagerParishComponent implements OnInit{
  sharedService = inject(SharedService);
  lstParish: Parish[] = [];
  currentParish: Parish = this.getEmptyParish();
  nextId = 1;
  parishService = inject(ParishService);
  dataRes:any;
  currentPage = 1;


  parish: Parish = {
    id: null,
    name: '',
    location: '',
    createdUser: '',
    updatedUser: '',
    isSelected: 0
  };
  managerParishService = inject(ManagerParishService);
  error:any;

  ngOnInit(): void {
    this.parishService.findAllParish().subscribe(res=>{
      this.dataRes = res;
      console.log(this.dataRes);
      this.dataRes = this.dataRes.data;
      this.lstParish = this.dataRes as Parish[];
      console.log(this.lstParish)
    },error => {

    });
    this.nextId = 3;
  }

  getEmptyParish(): Parish {
    return {
      id: 0,
      name: '',
      location: '',
      createdAt: '',
      updatedAt: '',
      createdUser:'',
      updatedUser:'',
      isSelected:-1
    };
  }

  onSubmit(): void {
    const now = new Date().toISOString().split('T')[0];

    if (this.currentParish.id === 0) {
      // Thêm mới
      this.currentParish.id = this.nextId++;
      this.currentParish.createdAt = now;
      this.currentParish.updatedAt = now;
      this.lstParish.push({ ...this.currentParish });
    } else {
      // Cập nhật
      const index = this.lstParish.findIndex(p => p.id === this.currentParish.id);
      if (index !== -1) {
        this.currentParish.updatedAt = now;
        this.lstParish[index] = { ...this.currentParish };
      }
    }

    this.currentParish = this.getEmptyParish();
  }

  selecteParish(parish: Parish): void {
    this.parish = parish;
  }

  deleteParish(parish: Parish): void {
    if(parish.id != null){
      this.managerParishService.deleteParish(parish).subscribe(res=>{
        console.log(res);
        window.location.href = '/parishManager';
      }, error => {
        console.log(error);
        this.dataRes = error;
        this.dataRes = this.dataRes.error.message;
        console.log(error);
        this.error = this.dataRes;
        console.log(this.dataRes);
      })
    }
  }


  submitParish(parish:Parish){
    console.log(parish.id);
    if(parish.id == null){
      this.managerParishService.addParish(parish).subscribe(res=>{
        console.log(res);
        window.location.href = '/parishManager';
      },error => {
        console.log(error);
        this.error = error;
        this.error = this.error.data.message;
      })
    }else {
      this.managerParishService.updateParish(parish).subscribe(res =>{
        console.log(res);
        window.location.href = '/parishManager';
      },error=>{
        this.error = error;
        this.error = this.error.data.message;
      })
    }

  }

  resetInput(){
    this.parish = {
      id: null,
      name: '',
      location: '',
      createdUser: '',
      updatedUser: '',
      isSelected: 0
    }
  }
}
