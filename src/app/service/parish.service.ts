import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParishService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  constructor() { }
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  findByParishId(parishId: number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/Parish/parishId/${parishId}`, {headers})
  }

  findAllParish(){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/Parish/getAllParish`, {headers})
  }
}
