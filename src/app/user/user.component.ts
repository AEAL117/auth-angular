import { ChangeDetectorRef, Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { User } from './user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../authentication/auth.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})

@Injectable({
  providedIn: 'root'
})
export class UserComponent implements OnInit {

  id: string="";
  nombreImput: string= "";
  apellidoImput: string="";
  userName: string="";
  email: string="";
  password: string="";
  userId: string="";
  

  users: User[] =[];
  user: User | undefined;
  token:string='';
  constructor(private userService: UserService,private authServer: AuthService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
   
   this.userService.getUsers(this.authServer.getAccessToken()).subscribe((data) => this.users = data);
   

    //console.log(this.users)
  }

  agregarPersona(){
    console.log("Post new User")
    this.userService.post("/keycloak/user/create",new User(this.nombreImput,this.apellidoImput,this.email,0,this.userName,this.password),this.authServer.getAccessToken()).subscribe((response: any) => {
      //console.log('Response:', response);
     
    });;
    this.updateTable();
    //this.resultado.emit(this.users);
    
  }

  updateTable() {
    this.userService.getUsers(this.authServer.getAccessToken()).subscribe((data) => {
      this.users = data
      this.cdr.detectChanges();
    });
  }

  findUser(){
      this.userService.findUser(this.authServer.getAccessToken(),this.userName).subscribe((data)=> {
        this.user=data
        
      });

  }
  
}