import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";
import {Parish} from "../model/interface-res";

@Injectable({
  providedIn: 'root'
})
export class ManagerParishService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);


  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  constructor() { }

  addParish(parish:Parish){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/Parish/add`, parish, {headers});
  }

  updateParish(parish:Parish){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/Parish/update`, parish, {headers});
  }

  deleteParish(parish:Parish){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().delete(`${this.sharedService.getBaseUrl()}/Parish/delete/${parish.id}`, {headers});
  }
}
