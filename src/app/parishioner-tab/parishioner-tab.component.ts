import {Component, inject} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {SharedModule} from "../shared/shared.module";

@Component({
  selector: 'app-parishioner-tab',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './parishioner-tab.component.html',
  styleUrl: './parishioner-tab.component.css'
})
export class ParishionerTabComponent {
  sharedService=inject(SharedService);
  parishioners = [{
    id: 4,
    name: "Quân",
    birthDate: "ada",
    gender: "adad",
    // group: str
    // phone: string
  }];
}
