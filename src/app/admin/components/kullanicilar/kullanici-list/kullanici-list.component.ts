import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Konu } from '../../../../contracts/konu/konu';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { KonularService } from '../../../../services/common/model/konular.service';
import { UserService } from '../../../../services/common/model/user.service';
import { UserList } from '../../../../contracts/user/userList';
import { count } from 'd3';

@Component({
  selector: 'app-kullanici-list',
  templateUrl: './kullanici-list.component.html',
  styleUrl: './kullanici-list.component.css'
})
export class KullaniciListComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private userService:UserService) {
    super(spinner);  
  }
  nameOrEmail:string;
  async ngOnInit(){
    await this.getUsers();
  }
  isAytOrTytToggle2:boolean=false;
  isAytOrTyt2(){
    this.isAytOrTytToggle2 = !this.isAytOrTytToggle2;
  }
  async getUsers(){
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const allUsers:{totalCount:number,users:UserList[]}=await this.userService.getAllUsers(this.page2,this.tableSize2,this.nameOrEmail,()=>this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating),errorMessage=>this.toastrService.message(errorMessage,"Hata",{
      messageType: ToastrMessageType.Error,
      position:ToastrPosition.TopRight,
    }));
    this.users=allUsers.users;
    this.count2=allUsers.totalCount;
  }
  onTableDataChange(event:any){
    this.page2=event;
    this.getUsers();
  }
  onTableSizeChange(event:any){
    this.tableSize2=event.target.value;
    this.page2=1;
    this.getUsers();
    
  }
  async changeSearchInput(nameOrEmail:string){
    this.nameOrEmail=nameOrEmail;
    this.getUsers();
  }
  title='pagination';
  users:any;
  page2:number=1;
  count2:number=0;
  tableSize2:number=5;
  tableSizes2:any=[5,10,15,20];

}
