import {Component, inject} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {SharedService} from "../../shared-service.service";

@Component({
  selector: 'app-parishioner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './parishioner.component.html',
  styleUrl: './parishioner.component.css'
})
export class ParishionerComponent {
  sharedService = inject(SharedService);
}
