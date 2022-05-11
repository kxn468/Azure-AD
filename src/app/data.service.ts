import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://localhost:44313/Home/getname";
  token:string="";
  constructor(private httpClient: HttpClient, private authService: MsalService) { }
  public sendGetRequest(){
   

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    .append('Access-Control-Allow-Origin','*').append('Authorization', 'Bearer ' + localStorage.getItem('msal.idtoken'));
    const header = new HttpHeaders();

    return this.httpClient.get(this.REST_API_SERVER,{
      headers:headers
    });
  }
}
