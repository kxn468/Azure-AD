import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  message:string="";
  user:string="";
  constructor(private dataService: DataService, private authService: MsalService) { }

  ngOnInit(): void {
    console.log("Profile page");
    this.user = this.authService.getAccount().name;
    this.dataService.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.message = data.toString();
    })  
  }

}
