import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { CreateAyt } from '../../../contracts/aytDeneme/CreateAyt';
import { CreateTyt } from '../../../contracts/tytDeneme/tytDenemeCreate';
import { HttpErrorResponse } from '@angular/common/http';
import { tytGenelList } from '../../../contracts/tytDeneme/tytGenelList';
import { TytSingleList } from '../../../contracts/tytDeneme/tytSingleList';
import { UpdateTyt } from '../../../contracts/tytDeneme/tytUpdate';
import { aytGenelList } from '../../../contracts/aytDeneme/aytGenelList';
import { AytSingleList } from '../../../contracts/aytDeneme/aytSingleList';
import { UpdateAyt } from '../../../contracts/aytDeneme/aytUpdate';
import { DenemeAnalizYanlis } from '../../../contracts/tytDeneme/denemeAnalizYanlis';
import { DenemeAnalizBos } from '../../../contracts/tytDeneme/denemeAnalizBos';

@Injectable({
  providedIn: 'root'
})
export class DenemelerService{

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }
  
  async createTyt(tytDeneme:CreateTyt,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<CreateTyt>=this.httpClientService.post({
      controller:"tyts",
      action:"createTyt"
    },tytDeneme);
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
  async createAyt(aytDeneme:CreateAyt,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<CreateAyt>=this.httpClientService.post({
      controller:"ayts",
      action:"createAyt"
    },aytDeneme);
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
  async getTytDenemes(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,tytDenemes:tytGenelList[]}>{
    const promiseData:Promise<{totalCount:number,tytDenemes:tytGenelList[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,tytDenemes:tytGenelList[]}>({
      controller:"tyts",
      action:"getAllTyt",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getTytYanlisAnaliz(denemeSayısı:number=5,konuSayısı:number=5,dersId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>{
    const promiseData:Promise<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>=firstValueFrom(this.httpClientService.get<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>({
      controller:"tyts",
      action:"DenemeAnalizTytYanlis",
      queryString:`DenemeSayısı=${denemeSayısı}&KonuSayısı=${konuSayısı}&DersId=${dersId}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getTytBosAnaliz(denemeSayısı:number=5,konuSayısı:number=5,dersId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{denemeBosAnaliz:DenemeAnalizBos[]}>{
    const promiseData:Promise<{denemeBosAnaliz:DenemeAnalizBos[]}>=firstValueFrom(this.httpClientService.get<{denemeBosAnaliz:DenemeAnalizBos[]}>({
      controller:"tyts",
      action:"DenemeAnalizTytBos",
      queryString:`DenemeSayısı=${denemeSayısı}&KonuSayısı=${konuSayısı}&DersId=${dersId}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async getAytDenemes(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,aytDenemes:aytGenelList[]}>{
    const promiseData:Promise<{totalCount:number,aytDenemes:aytGenelList[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,aytDenemes:aytGenelList[]}>({
      controller:"ayts",
      action:"getAllAyt",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getAytYanlisAnaliz(denemeSayısı:number=5,konuSayısı:number=5,dersId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>{
    const promiseData:Promise<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>=firstValueFrom(this.httpClientService.get<{denemeYanlisAnaliz:DenemeAnalizYanlis[]}>({
      controller:"ayts",
      action:"DenemeAnalizAytYanlis",
      queryString:`DenemeSayısı=${denemeSayısı}&KonuSayısı=${konuSayısı}&DersId=${dersId}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getAytBosAnaliz(denemeSayısı:number=5,konuSayısı:number=5,dersId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{denemeBosAnaliz:DenemeAnalizBos[]}>{
    const promiseData:Promise<{denemeBosAnaliz:DenemeAnalizBos[]}>=firstValueFrom(this.httpClientService.get<{denemeBosAnaliz:DenemeAnalizBos[]}>({
      controller:"ayts",
      action:"DenemeAnalizAytBos",
      queryString:`DenemeSayısı=${denemeSayısı}&KonuSayısı=${konuSayısı}&DersId=${dersId}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getTytById(id:string,successCallBack:()=>void):Promise<TytSingleList>{
    const observable=this.httpClientService.get({
      controller:"tyts",
      action:"getTytById",
      queryString:`TytId=${id}`
    });
    const promiseData=await firstValueFrom(observable) as TytSingleList;
    successCallBack();
    return promiseData;
  }
  async getAytById(id:string,successCallBack:()=>void):Promise<AytSingleList>{
    const observable=this.httpClientService.get({
      controller:"ayts",
      action:"getAytById",
      queryString:`AytId=${id}`
    });
    const promiseData=await firstValueFrom(observable) as AytSingleList;
    successCallBack();
    return promiseData;
  }

  async editTyt(tytDeneme:UpdateTyt,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable=this.httpClientService.post({
      controller:"tyts",
      action:"updateTyt"
    },tytDeneme);
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
  async editAyt(aytDeneme:UpdateAyt,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable=this.httpClientService.post({
      controller:"ayts",
      action:"updateAyt"
    },aytDeneme);
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
