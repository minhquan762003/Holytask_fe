import {Component, inject, OnInit} from '@angular/core';
import {SharedService} from "./shared-service.service";
import {SharedModule} from "./shared/shared.module";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AuthService} from "./service/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'holytask_project';
  isLogin = false;
  authService = inject(AuthService);
  ngOnInit(): void {
    if(this.authService.getIsLoggedIn() == "1"){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }
}

