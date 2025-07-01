import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";
import {ParishionerProfile} from "../model/interface-res";

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
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/parishionerProfile/update`,parishioner, {headers});
  }

  getByParishId(parishId:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/parishionerProfile/parish/${parishId}`, {headers});
  }

  getByParishIdAndGroupId(parishId:number, groupId:number, name:string){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/parishionerProfile/parish/group/${parishId}/${groupId}/${name}`, {headers});
  }

  deleteParishioner(id:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().delete(`${this.sharedService.getBaseUrl()}/parishionerProfile/delete/${id}`, {headers});
  }
}
