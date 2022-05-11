import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import{MatButtonModule} from '@angular/material/button';
import{MatListModule} from '@angular/material/list'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { analyzeNgModules } from '@angular/compiler';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MsalModule.forRoot({    
      auth: {
        clientId: '82a06437-82f8-4278-b151-1d1a96556105', // This is your client ID
        authority: 'https://login.microsoftonline.com/eaf06ba5-c7d6-4142-8f78-c510fb1c832a', // This is your tenant ID
        redirectUri: 'http://localhost:4200/',// This is your redirect URI
        postLogoutRedirectUri:'http://localhost:4200/'
      },     
      
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
        'api://c597a277-4fab-498c-84ea-8e700dd0b9b1/api-access'
      ],
      unprotectedResources: [],
      //export const protectedResourceMap:[string, string[]][]=[['https://localhost:44388/api/values', ['api://59b02905-8b6b-4665-a702-321e97392416/api-access']] ];
      protectedResourceMap: [
        ['https://localhost:44313/', ['api://c597a277-4fab-498c-84ea-8e700dd0b9b1/api-access']]
      ],
      extraQueryParameters: {}
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
