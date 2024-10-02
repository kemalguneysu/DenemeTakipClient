import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { UserService } from '../../../../services/common/model/user.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../../services/common/model/role.service';
import { UserList } from '../../../../contracts/user/userList';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-kullanici-single',
  templateUrl: './kullanici-single.component.html',
  styleUrl: './kullanici-single.component.css'
})
export class KullaniciSingleComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private toastrService:CustomToastrService,private userService:UserService,private roleService:RoleService,private route:ActivatedRoute) {
    super(spinner);  
  }
  userId: string;
  allRoles:any;
  user:any;
  userRoles:any;
  clickedRoles:string[]=[];
  

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) 
      this.userId = id;
    await this.getAllRoles();
    await this.getUserRoles(this.userId);
    await this.getUserById(this.userId);
    if(this.userRoles.length!=0)
      this.clickedRoles=this.clickedRoles.concat(this.userRoles);
  }

  async getUserRoles(name:string){
    var roles:any=await this.userService.getUserRoles(name);
    this.userRoles=roles["userRoles"];

  }
  async getUserById(userId:string){
    var user:any=await this.userService.getUserById(userId);
    this.user=user['user'];
  }
  async getAllRoles(){
    var roles=await this.roleService.getRoles();
    this.allRoles=roles;
  }
  isInRole(name:string){
    return this.userRoles.includes(name);
  }
  roleCheck(roleName:string){
    if(this.clickedRoles.includes(roleName))
      this.clickedRoles = this.clickedRoles.filter((item) => item !== roleName); 
    else
      this.clickedRoles.push(roleName);
    
  }
  editRole(){
    if(this.clickedRoles.length==0)
      return;
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating)
    var model={
      userId:this.userId,
      roles:this.clickedRoles
    };
    this.userService.editRole(model,async ()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.toastrService.message("Rol Güncellemesi","Rol başarıyla güncellendi",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })});
      
  }
}
