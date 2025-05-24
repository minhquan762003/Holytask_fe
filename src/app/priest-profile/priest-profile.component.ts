import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {PriestprofilesService} from "../service/priestprofiles.service";
import {SharedService} from "../shared-service.service";
interface Priest {
  name: string;
  avatar: string;
  parish: string;
  email: string;
  phone: string;
  address: string;
  joined: string;
  bio: string;
}
@Component({
  selector: 'app-priest-profile',
  standalone: true,
  imports: [],
  templateUrl: './priest-profile.component.html',
  styleUrl: './priest-profile.component.css'
})
export class PriestProfileComponent implements OnInit{
  authService = inject(AuthService);
  priestProfiles = inject(PriestprofilesService);
  data1: any;
  sharedService = inject(SharedService);


  priest: Priest = {
    name: 'Father John Doe',
    avatar: '/assets/images/priest.jpg',
    parish: "St. Mary's Parish",
    email: 'john.doe@holytask.org',
    phone: '+66 1234 5678',
    address: '123 Church St, Bangkok',
    joined: '2021-08-15',
    bio: 'Dedicated to serving the community and guiding the faithful.'
  };

  ngOnInit(): void {
    this.getPriestProfilesByUserId();
  }

  getPriestProfilesByUserId() {
    this.priestProfiles.getByUserId(this.authService.getCurrentUser()?.id).subscribe(res => {
      this.data1 = res;
      console.log(this.data1);
      // this.priestId = this.data1.data.id;
      // this.priestProfiles.setPriestId(this.priestId);
      // this.getVisitsByPriestId(this.priestId);
    });
  }

}
