import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriestprofilesService {
  private sharedService = inject(SharedService);
  private authService = inject(AuthService);
  private data:any;
  private priestId :any;
  constructor() { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  setPriestId(priestId :any){
    this.priestId = priestId;
  }

  getPriestId(){
    return this.priestId;
  }
  getByUserId(userId:any){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/priestProfile/userId/${userId}`, {headers});
  }

}
