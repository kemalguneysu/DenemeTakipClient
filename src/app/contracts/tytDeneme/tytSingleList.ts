export class TytSingleList{
    id:string;
    turkceDogru:number;
    turkceYanlis:number;
    matematikDogru:number;
    matematikYanlis:number;
    fenDogru:number;
    fenYanlis:number;
    sosyalDogru:number;
    sosyalYanlis:number;
    yanlisKonularAdDers:Array<konularAdDers>;
    bosKonularAdDers:Array<konularAdDers>;
}
export class konularAdDers{
    konuAdi:string;
    konuId:string;
    dersAdi:string;
    dersId:string;
}