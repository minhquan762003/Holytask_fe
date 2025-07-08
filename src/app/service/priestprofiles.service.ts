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
  private imgbbApiKey = 'ea439d7bc84ed787bbf31d54f1875b81';
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

  uploadToImgBB(base64Image: string){
    const url = `https://api.imgbb.com/1/upload?expiration=15552000&key=${this.imgbbApiKey}`;
    const formData = new FormData();
    formData.append('image', base64Image);
    return this.sharedService.getHttp().post(url, formData);
  }

  updateProfile(editProfile:any, userId:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/priestProfile/update/${userId}`,editProfile, {headers});

  }



}
