import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VisitscheduleService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);

  constructor() {
  }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addVisitSchedule(visitSchedule: any) {
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/visitSchedule/add`, visitSchedule, {headers});
  }

  getVisitsByPriestId(priestId: any) {
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/visitSchedule/${priestId}`, {headers});
  }

  getByIdVisit(id: number) {
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/visitSchedule/idVisit/${id}`, {headers})
  }



  updateVisitSchedule(datamodel:any ,idVisit:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/visitSchedule/update/${idVisit}`,datamodel, {headers});
  }

  deleteVisitSchedule(idVisit:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().delete(`${this.sharedService.getBaseUrl()}/visitSchedule/delete/${idVisit}`,{headers});
  }

  getByDate(dateStr:string){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/visitSchedule/byDate`, {headers, params:{strDate:dateStr}}, );
  }

}
