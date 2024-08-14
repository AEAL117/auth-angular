import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  csrfToken: string = "";
  users: any | undefined;
  constructor(private http: HttpClient) { }
  getCsrf() {
    return this.http.get("http://localhost:8080/csrf/token", {withCredentials: true}
    ).subscribe((data: any) => this.csrfToken = data.token);
  }

  findUser(token: string, userName: string): Observable<any>{

    const headers = {"Access-Control-Allow-Origin": "http://localhost:4200",'Authorization': `Bearer ${token}`,"X-XSRF-TOKEN": this.csrfToken }
    //const headers = {'Authorization': `Bearer ${token}`}
    return this.http.get<any>("http://localhost:8080/keycloak/user/search/"+userName,  {headers, withCredentials: true})
  }

  getUsers(token: string ): Observable<any[]>{

    //console.log(token)
    console.log(this.csrfToken)
    const headers = {"Access-Control-Allow-Origin": "http://localhost:4200",'Authorization': `Bearer ${token}`,"X-XSRF-TOKEN": this.csrfToken }
    //const headers = {'Authorization': `Bearer ${token}`}
    return this.http.get<any[]>("http://localhost:8080/keycloak/user/search",  {headers,withCredentials: true}
    )
  }

  saveUser(token: string){
    const headers={"Access-Control-Allow-Origin":"http://localhost:4200",'Authorization':`Bearer ${token}`,"X-XSRF-TOKEN": this.csrfToken}
    return this.http.post<any[]>("http://localhost:8080/keycloak/user/create",  {headers, withCredentials: true}
    )
  }


  post(url: string, data: any,token: string): any {
    const headers={"Access-Control-Allow-Origin":"http://localhost:4200",'Authorization':`Bearer ${token}`,"X-XSRF-TOKEN": this.csrfToken}
    return this.http.post(
      "http://localhost:8080" + url,
      data,
      {headers, withCredentials: true}
     );
  }
}