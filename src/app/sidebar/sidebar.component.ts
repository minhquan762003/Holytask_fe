import {Component, inject} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {SharedService} from "../shared-service.service";
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  constructor() {
  }

  changeLanguage(event: any) {
    const lang = event.target.value;
    this.sharedService.getTranslateService().setLanguage(lang);
  }

  signOut(){
    this.authService.logOut();
    this.sharedService.getRouterService().navigate(['/login']);
  }
  languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' }

  ];
}
