import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared-service.service";
import {Documents, ParishionerProfile} from "../../model/interface-res";
import {ParishionerService} from "../../service/parishioner.service";
import {PriestprofilesService} from "../../service/priestprofiles.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-parishioner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './parishioner.component.html',
  styleUrl: './parishioner.component.css'
})
export class ParishionerComponent implements OnInit{
  sharedService = inject(SharedService);
  parishionerService = inject(ParishionerService)
  parishioners: ParishionerProfile[] = [];
  parishId:number = -1;
  priestprofilesService = inject(PriestprofilesService);
  authService = inject(AuthService);
  resData:any;
  currentPage = 1;

  selectedParishioner:ParishionerProfile|undefined;

  ngOnInit(): void {

    this.priestprofilesService.getByUserId(this.authService.getCurrentUser()?.id)
      .subscribe(res => {
        this.resData = res;
        this.resData = this.resData.data;
        this.resData = this.resData.parish;
        this.parishId = this.resData.id;
        console.log(this.parishId);
        if(this.parishId != -1){
          this.parishionerService.getByParishIdOrderByViewDate(this.parishId).subscribe( res=>{
            this.resData = res;
            this.resData = this.resData.data;
            this.parishioners = this.resData as ParishionerProfile[];
          })
        }
      });
  }

  viewDetail(person:ParishionerProfile){
    this.selectedParishioner = person;
    this.parishionerService.setViewDate(person.id).subscribe(res=>{
      console.log(res);
    })
    console.log(person);
  }


}
