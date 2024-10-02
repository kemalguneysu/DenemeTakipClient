import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService } from '../custom-toastr.service';
import { Konu } from '../../../contracts/konu/konu';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Ders } from '../../../contracts/ders/ders';
import { DersCreate } from '../../../contracts/ders/dersCreate';
import { UpdateDers } from '../../../contracts/ders/dersUpdate';

@Injectable({
  providedIn: 'root'
})
export class DerslerService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

  async getDers(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,derss:Ders[]}>{
    const promiseData:Promise<{totalCount:number,derss:Ders[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,derss:Ders[]}>({
      controller:"ders",
      action:"getDers",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getAllDers(isTyt?:boolean,dersAdi?:string,page?:number,size?:number,successCallBack?:any,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,dersler:Ders[]}>{
    let queryString = '';
    if (isTyt !== undefined) {
      queryString = `isTyt=${isTyt}`;
    }
    if(dersAdi)
      queryString += `&DersAdi=${dersAdi}`;
    if(page && size)
      queryString += `&page=${page}&size=${size}`;
    // const observable=this.httpClientService.get({
    //   controller:"ders",
    //   action:"getAllDersler",
    //   queryString:queryString
    // });
    const promiseData:Promise<{totalCount:number,dersler:Ders[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,dersler:Ders[]}>({
      controller:"ders",
      action:"getAllDersler",
      queryString:queryString
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

    // const promiseData=await firstValueFrom(observable) as Ders[];
    return await promiseData;
  }
  async dersEkle(ders:DersCreate,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<DersCreate>=this.httpClientService.post({
      controller:"ders",
      action:"createDers"
    },ders);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v} \n`;
        });
      });
      if(errorCallBack)
      errorCallBack(message);
    });
  }
  async getTytDersler(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,tytDersler:Ders[]}>{
    const promiseData:Promise<{totalCount:number,tytDersler:Ders[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,tytDersler:Ders[]}>({
      controller:"ders",
      action:"getAllTytDersler",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getAytDersler(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,aytDersler:Ders[]}>{
    const promiseData:Promise<{totalCount:number,aytDersler:Ders[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,aytDersler:Ders[]}>({
      controller:"ders",
      action:"getAllAytDersler",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getDersById(id:string):Promise<Ders>{
    const observable=this.httpClientService.get({
      controller:"ders",
      action:"getDersById",
      queryString:`DersId=${id}`
    });
    const promiseData=await firstValueFrom(observable) as Ders;
    return promiseData;
  }
  async editDers(updateDers:UpdateDers,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable=this.httpClientService.post({
      controller:"ders",
      action:"updateDers"
    },updateDers);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback()
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v} \n`;
        });
      });
      if(errorCallBack)
      errorCallBack(message);
    });
  }
}
