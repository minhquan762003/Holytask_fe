import {Component, inject, OnInit} from '@angular/core';
import {SharedModule} from "./shared/shared.module";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AuthService} from "./service/auth.service";
import {WebSocketService} from "./service/web-socket.service";
import {NotificationService} from "./service/notification.service";
import {PriestprofilesService} from "./service/priestprofiles.service";


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
  priestProfiles = inject(PriestprofilesService);
  data1:any;
  private priestId :any;
  ngOnInit(): void {
    this.isLogin = this.authService.getIsLoggedIn() === "1";

    this.priestProfiles.getByUserId(this.authService.getCurrentUser()?.id).subscribe(res => {
      this.data1 = res;
      const priestId = this.data1.data.id;
      this.priestProfiles.setPriestId(priestId);

      // ✅ Gọi WebSocket connect sau khi đã có priestId
      if(priestId!=undefined){
        this.webSocketService.connect(priestId);

        // Lắng nghe dữ liệu push từ server
        this.webSocketService.getMessages().subscribe(notification => {
          this.notificationService.handleNotification(notification);
        });
      }
    });
  }

  constructor(
    private webSocketService: WebSocketService,
    private notificationService: NotificationService,
  ) {}
}

