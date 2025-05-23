import { Component } from '@angular/core';
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
export class PriestProfileComponent {
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
}
