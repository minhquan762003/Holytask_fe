import {inject, Injectable} from '@angular/core';
import {TranslateService} from "./service/translate.service";
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./service/user.service";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'  // Dịch vụ này sẽ tồn tại trong toàn bộ ứng dụng
})
export class SharedService {
  private translateService = inject(TranslateService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';
  private errorMessage = "";

  getTranslateService() {
    return this.translateService;
  }

  getRouterService() {
    return this.router;
  }



  getHttp() {
    return this.http;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getErrorMessageWithNamespace(name:string) {
    this.errorMessage = this.translateService.translate('text.alert.thatbai');
    return name + this.errorMessage ;
  }



}
