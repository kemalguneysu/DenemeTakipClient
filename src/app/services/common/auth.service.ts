import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { local } from 'd3';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService) { }
  identityCheck(){
    const token:string=localStorage.getItem("accessToken") as string;
    if(token){
      let expired:boolean;
      const decoded: any = jwtDecode(token);
      const roleClaimName = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      let roles: string[] = [];

      if (decoded[roleClaimName]) {
        if (Array.isArray(decoded[roleClaimName])) {
          roles = decoded[roleClaimName];
        } else {
          roles = [decoded[roleClaimName]];
        }
      }
      try{
        expired=this.jwtHelper.isTokenExpired(token);

      }catch{
        expired=true;
      }
      _isAdmin=roles.includes('admin');
      _isAuthenticated=token!=null&&!expired
    }
    else{
      _isAuthenticated=false;
      _isAdmin=false;
    }
  }
  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
  get isAdmin():boolean{
    return _isAdmin;
  }
 
}

export let _isAuthenticated:boolean;
export let _isAdmin:boolean;


