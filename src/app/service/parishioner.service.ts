import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParishionerService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);

  constructor() { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createParishioner(parishioner:any){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/parishionerProfile/add`,parishioner, {headers});
  }

  updateParishioner(parishioner:any){
    const headers = this.createHeaders();

  }

}
