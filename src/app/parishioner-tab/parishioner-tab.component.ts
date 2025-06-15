import {Component, inject, OnInit} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {SharedModule} from "../shared/shared.module";
import {SubparishService} from "../service/subparish.service";
import {ParishGroup, PriestProfile, SubParish} from "../model/interface-res";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {AuthService} from "../service/auth.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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

  lstSubParish:SubParish[] = [];

  parishioners = {
    fullName: "Quân",
    birthDate: "07/06/2003",
    address: "viet nam",
    phoneNumber: "123",
    imgUrl: "123156",
    parishGroupId: undefined,
    subParishId:undefined,
  };


  ngOnInit(): void {
    this.priestprofilesService.getByUserId(this.authService.getCurrentUser()?.id)
      .subscribe(res => {
        this.data1 = res;
        this.priestProfile = this.data1.data as PriestProfile;
        this.parishId = this.priestProfile.parish?.id as number;
        console.log('Parish ID:', this.parishId);

        if (this.parishId != -1) {
          this.subparishService.getByParishId(this.parishId).subscribe(res => {
            this.data = res;
            this.data =  this.data.data;
            this.lstSubParish = this.data as SubParish[];
            console.log(this.lstSubParish);
          });
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

}
