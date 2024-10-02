import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService } from '../custom-toastr.service';
import { User } from '../../../contracts/entities/user';
import { UserCreate } from '../../../contracts/user/userCreate';
import { Observable, firstValueFrom } from 'rxjs';
import { UserList } from '../../../contracts/user/userList';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

  async create(user:User,successCallback?:any,errorCallBack?: (errorMessage: string) => void):Promise<UserCreate>{
    const observable:Observable<UserCreate | User>=this.httpClientService.post<UserCreate| User>({
      controller:"users",
      action:"createUser"
    },user);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback();
    },(errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}\n`;
        });
      });
      if (errorCallBack) {
        errorCallBack(message.trim());
      }
    });
    return await firstValueFrom(observable) as UserCreate;
  }
  async getAllUsers(page:number=1,size:number=5,nameOrEmail?:string,successCallBack?:any,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,users:UserList[]}>{
    const observable:Observable<{totalCount:number,users:UserList[]}>=this.httpClientService.get({
      controller:"users",
      queryString:`page=${page}&size=${size}${nameOrEmail ? `&nameOrEmail=${nameOrEmail}` : ''}`
    });
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallBack();
    });
    
    return await promiseData;
  }
  async getUserRoles(userName:string){
    const observable=this.httpClientService.get({
      controller:"users",
      action:"GetUserRoles",
      queryString:`UserName=${userName}`
    });
    const promiseData=firstValueFrom(observable);
    return await promiseData;
  }
  async getUserById(userId:string){
    const observable  =this.httpClientService.get({
      controller:"users",
      action:"GetUserById",
      queryString:`UserId=${userId}`
    });
    const promiseData=firstValueFrom(observable);
    return await promiseData;
  }
  async editRole(model:any,successCallback?:any){
    const observable  =this.httpClientService.post({
      controller:"users",
      action:"AssignRolesToUser",
    },model);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback()
    });
    
  }
  async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,successCallBack?:()=>void,errorCallBack?:(error:any)=>void){
    const observable=this.httpClientService.post({
      controller:"users",
      action:"UpdatePassword"
    },{
      userId:userId,resetToken:resetToken,password:password,passwordConfirm:passwordConfirm
    })
    const promiseData=firstValueFrom(observable);
    if(successCallBack && errorCallBack)
      promiseData.then(value=>successCallBack()).catch(error=>errorCallBack(error));
    await promiseData;
  }
}
