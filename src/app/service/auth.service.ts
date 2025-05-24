import {inject, Injectable} from '@angular/core';
import {User} from "../model/User";
import {SharedService} from "../shared-service.service";
import {jwtDecode} from 'jwt-decode';
import {PriestprofilesService} from "./priestprofiles.service";
import {WebSocketService} from "./web-socket.service";

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  sharedService = inject(SharedService);
  private currentUser: User | undefined;
  private isRemember: boolean = false;
  private webSocketService = inject(WebSocketService)
  constructor() {
  }

  setRemember(a: boolean) {
    this.isRemember = a;
    localStorage.setItem("rememberMe", JSON.stringify(a));
  }
  getRemember() {
    return this.isRemember;
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem("rememberMe")=="true"){
        localStorage.setItem("accessToken", token);
      }else {
        sessionStorage.setItem("accessToken", token);
      }
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      if(localStorage.getItem("rememberMe")=="true"){
        return localStorage.getItem("accessToken");
      }else {
        return sessionStorage.getItem("accessToken");
      }
    }
    return null;
  }

  setIsLoggedIn(a: number) {
    if(localStorage.getItem("rememberMe")=="true"){
      localStorage.setItem("isLoggedIn", a.toString());
    }else {
      sessionStorage.setItem("isLoggedIn", a.toString());
    }
  }

  getIsLoggedIn() {
    if(localStorage.getItem("rememberMe")=="true"){
      return localStorage.getItem("isLoggedIn");
    }else {
      return sessionStorage.getItem("isLoggedIn");
    }
  }

  removeToken() {
    if (typeof window !== 'undefined' && window.localStorage) {

      localStorage.removeItem("accessToken");
    }
  }

  getUserInformation(): User | undefined {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);

      const user = new User(
        decoded.username,
        decoded.email,
        decoded.role,
        decoded.profilePictureUrl,
        decoded.isActive,
        decoded.createdAt,
        decoded.updatedAt,
        decoded.sub
      );

      return user;
    }
    return undefined;
  }


  setCurrentUser(currentUser: User | undefined) {
    this.currentUser = currentUser;
    if (currentUser && typeof window !== 'undefined' && window.localStorage) {
      if(localStorage.getItem("rememberMe")=="true"){
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }else {
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  getCurrentUser(): User | undefined {
    if (!this.currentUser && typeof window !== 'undefined' && window.localStorage) {
      if(localStorage.getItem("rememberMe")=="true"){
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          this.setIsLoggedIn(1);
          this.currentUser = JSON.parse(storedUser);
        }
      }else {
        const storedUser = sessionStorage.getItem("currentUser");
        if (storedUser) {
          this.setIsLoggedIn(1);
          this.currentUser = JSON.parse(storedUser);
        }
      }
    }
    return this.currentUser ?? undefined;
  }
  private data :any;



  logOut() {
    if (typeof window !== 'undefined' && window.localStorage) {
      typeof window !== 'undefined' && window.localStorage
      if(localStorage.getItem("rememberMe")=="true"){
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("loginToastShown");
      }else {
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("loginToastShown");
      }
      this.removeToken();
      this.setIsLoggedIn(0);
      this.currentUser = undefined;
      window.location.href = '/login';
      this.webSocketService.disconnect();

    }
  }


}
