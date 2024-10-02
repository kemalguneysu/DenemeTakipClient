import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService } from '../custom-toastr.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

  async getRoles(){
    const observable=this.httpClientService.get({
      controller:"roles",
      action:"GetAllRoles"
    });
    const promiseData=firstValueFrom(observable);
    return await promiseData;
  }
}
