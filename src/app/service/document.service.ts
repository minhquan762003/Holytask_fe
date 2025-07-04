import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {AuthService} from "./auth.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  constructor() { }

  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  uploadFile(formData:FormData){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/minio/upload`,formData, {headers});
  }

  getDocByPriestId(priestId:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/document/priestId/${priestId}`, {headers});
  }

  downloadDoc(downloadUrl: string) {
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(downloadUrl, {
      headers,
      responseType: 'blob'  // <- quan trọng
    });
  }

  deleteDocById(docId:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/document/deleteDoc/${docId}`,null, {headers});
  }

  findDocByName(name:string){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/document/findByName/${name}`,{headers});

  }
}
