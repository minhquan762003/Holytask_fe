import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";
import {SubParish} from "../model/interface-res";

@Injectable({
  providedIn: 'root'
})
export class ManagerSubParishService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);


  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  constructor() { }

  addSubParish(subParish:SubParish){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/subparish/add`, subParish, {headers});
  }

  updateSubParish(subParish:SubParish){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/subparish/update`, subParish, {headers});
  }

  deleteSubParish(subParishId:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().delete(`${this.sharedService.getBaseUrl()}/subparish/delete/${subParishId}`, {headers});
  }

}
