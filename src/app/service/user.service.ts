import {inject, Injectable} from '@angular/core';
import {SharedService} from "../shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sharedService = inject(SharedService);
  constructor() { }

  register(user:any){
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/user/register`,user);
  }
  login(username:string, password:string){
    return this.sharedService.getHttp().post(`${this.sharedService.getBaseUrl()}/user/login`,{username, password});
  }
}
