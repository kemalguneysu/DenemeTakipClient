export class AytSingleList{
    id:string;
    matematikDogru:number;
    matematikYanlis:number;
    fizikDogru:number;
    fizikYanlis:number;
    kimyaDogru:number;
    kimyaYanlis:number;
    biyolojiDogru:number;
    biyolojiYanlis:number;
    edebiyatDogru:number;
    edebiyatYanlis:number;
    tarih1Dogru:number;
    tarih1Yanlis:number;
    tarih2Dogru:number;
    tarih2Yanlis:number;
    cografya1Dogru:number;
    cografya1Yanlis:number;
    cografya2Dogru:number;
    cografya2Yanlis:number;
    felsefeDogru:number;
    felsefeYanlis:number;
    dinDogru:number;
    dinYanlis:number;
    dilDogru:number;
    dilYanlis:number;

    yanlisKonularAdDers:Array<konularAdDers>;
    bosKonularAdDers:Array<konularAdDers>;
}
export class konularAdDers{
    konuAdi:string;
    konuId:string;
    dersAdi:string;
    dersId:string;
}