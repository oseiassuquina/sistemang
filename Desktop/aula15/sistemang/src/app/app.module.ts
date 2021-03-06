import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { camisetaComponent } from './camiseta/camiseta.Component';
import { LoginComponent } from './login/login.component';
import { calçaComponent } from './calça/calça.componet'
import { AngularFireAuth  } from '@angular/fire/auth';

import { AuthGuard } from "./guards/auth.guard";

import { LoginService } from "./login/login.service"

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    camisetaComponent,
    calçaComponent,
    LoginComponent    
  ],
  providers: [AuthGuard, LoginService, AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }