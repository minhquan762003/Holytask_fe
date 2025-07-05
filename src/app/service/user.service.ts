import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {User} from "../model/interface-res";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sharedService = inject(SharedService);
  authService = inject(AuthService);
  constructor() { }
  private createHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  register(user:any){
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/user/register`,user);
  }
  login(username:string, password:string){
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/user/login`,{username, password});
  }
  getUserById(id:number){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/user/userId/${id}`, {headers})
  }
  getAllUser(){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().get(`${this.sharedService.getBaseUrl()}/user/getAllUsers`, {headers})
  }
  updateUser(user:User){
    const headers = this.createHeaders();
    return this.sharedService.getHttp().put(`${this.sharedService.getBaseUrl()}/user/updateUsers`,user, {headers})

  }
}
