import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Konu } from '../../../contracts/konu/konu';
import { Observable, first, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { KonuCreate } from '../../../contracts/konu/konuCreate';
import { ListAllKonu } from '../../../contracts/konu/listAllKonu';
import { UpdateKonu } from '../../../contracts/konu/konuUpdate';

@Injectable({
  providedIn: 'root'
})
export class KonularService {

  constructor(private httpClientService:HttpClientService) { }

  async createKonu(konu:Konu,successCallback?:any){
    const observable:Observable<Konu>=this.httpClientService.post({
      controller:"konular",
    },konu);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback();
    });
  }

  async listKonu(page:number=1,size:number=5,successCallback?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,konular:Konu[]}>{
    const promiseData:Promise<{totalCount:number,konular:Konu[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,konular:Konu[]}>({
      controller:"konular",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallback!=null && errorCallBack!=null)
      promiseData.then(d=>successCallback()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  
  async getAllKonu():Promise<Konu[]>{
    const observable=this.httpClientService.get({
      controller:"konular",
      action:"getAllKonular"
    });
    const promiseData=await firstValueFrom(observable) as Konu[];
    return promiseData;
  }
  async konuEkle(konu:KonuCreate,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<KonuCreate>=this.httpClientService.post({
      controller:"konular",
      action:"createKonu"
    },konu);
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
  }

  async getTytKonular(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,tytKonular:Konu[]}>{
    const promiseData:Promise<{totalCount:number,tytKonular:Konu[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,tytKonular:Konu[]}>({
      controller:"konular",
      action:"getAllTytKonular",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }

  async getAytKonular(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,aytKonular:Konu[]}>{
    const promiseData:Promise<{totalCount:number,aytKonular:Konu[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,aytKonular:Konu[]}>({
      controller:"konular",
      action:"getAllAytKonular",
      queryString:`page=${page}&size=${size}`
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
  async getKonuById(id:string):Promise<ListAllKonu>{
    const observable=this.httpClientService.get({
      controller:"konular",
      action:"getKonuById",
      queryString:`KonuId=${id}`
    });
    const promiseData=await firstValueFrom(observable) as ListAllKonu;
    return promiseData;
  }
  async editKonu(updateKonu:UpdateKonu,successCallback?:any,errorCallBack?: (errorMessage: string) => void){
    const observable=this.httpClientService.post({
      controller:"konular",
      action:"updateKonu"
    },updateKonu);
    const promiseData=firstValueFrom(observable);
    promiseData.then(()=>{
      successCallback()
    }, (errorResponse: HttpErrorResponse) => {
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
  }
  async getAllKonularFiltered(isTyt:boolean=true,konuAdi?:string,dersIds?:string[],page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,konular:Konu[]}>
  {
    let queryString=`isTyt=${isTyt}`;
    if (konuAdi) 
      queryString += `&KonuAdi=${konuAdi}`;
    if (dersIds && dersIds.length > 0) 
      queryString += `&dersId=${dersIds.join('&dersId=')}`;
    queryString += `&page=${page}&size=${size}`;
    const promiseData:Promise<{totalCount:number,konular:Konu[]}>=firstValueFrom(this.httpClientService.get<{totalCount:number,konular:Konu[]}>({
      controller:"konular",
      action:"GetAllKonularPaginated",
      queryString:queryString
    }));
    if(successCallBack!=null && errorCallBack!=null)
      promiseData.then(d=>successCallBack()).catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
    return await promiseData;
  }
}
