import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {Parish, SubParish} from "../model/interface-res";
import {SubparishService} from "../service/subparish.service";
import {ParishService} from "../service/parish.service";
import {ManagerSubParishService} from "../service/manager-sub-parish.service";

@Component({
  selector: 'app-manager-subparish',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-subparish.component.html',
  styleUrl: './manager-subparish.component.css'
})
export class ManagerSubparishComponent implements OnInit{
  sharedService = inject(SharedService);
  parishes: Parish[] = [];
  subParishes: SubParish[] = [];
  currentSubParish: SubParish = this.getEmptySubParish();
  selectedParishId: number | null = null;
  nextId = 1;
  subparishService = inject(SubparishService);
  resData :any;
  currentPage = 1;
  parsishService = inject(ParishService);
  managerSubParishService = inject(ManagerSubParishService);
  error:any;

  subParish:SubParish = {
    id :-1,
    name: '',
    parish:{
      id: null,
      name: '',
      location: '',
      createdUser: '',
      updatedUser: '',
      isSelected: 0
    }
  }

  ngOnInit(): void {

    this.subparishService.getAllSubParishes().subscribe(res=>{
      console.log(res);
      this.resData = res;
      this.resData = this.resData.data;
      this.subParishes = this.resData as SubParish[];
    })

    this.parsishService.findAllParish().subscribe(res=>{
      this.resData = res;
      this.resData = this.resData.data;
      this.parishes = this.resData as Parish[];
    })
  }

  getEmptySubParish(): SubParish {
    return {
      id: 0,
      name: '',
      parish: { id: 0, name: '', location: '',      createdUser:'',
        updatedUser:'', isSelected:-1 }
    };
  }


  selectSubParish(sub:SubParish){
    this.subParish = sub;
  }

  deleteSubParish(sub: SubParish): void {
    this.managerSubParishService.deleteSubParish(sub.id).subscribe(res=>{
      console.log(res);
      window.location.href = '/subparishManager';
    },error => {
      console.log(error);
      this.resData = error;
      this.resData = this.resData.error.message;
      console.log(error);
      this.error = this.resData;
      console.log(this.resData);
    })
  }

  resetForm(): void {
    this.currentSubParish = this.getEmptySubParish();
    this.selectedParishId = null;
  }

  addSubparish(subParish:SubParish){
    if(this.subParish.id == -1){
      console.log(subParish)
      this.managerSubParishService.addSubParish(subParish).subscribe(res => {
        console.log(res);
        window.location.href = '/subparishManager';
      },error => {
        console.log(error);
      })
    }else {
      console.log(subParish);
      this.managerSubParishService.updateSubParish(subParish).subscribe(res => {
        console.log(res);
        window.location.href = '/subparishManager';
      }, error =>  {
        this.resData = error;
        this.resData = this.resData.error.message;
        console.log(error);
        this.error = this.resData;
        console.log(this.resData);
      });
    }

  }

  resetInput(){
    this.subParish = {
      id :-1,
      name: '',
      parish:{
        id: null,
        name: '',
        location: '',
        createdUser: '',
        updatedUser: '',
        isSelected: 0
      }
    }
  }
}
