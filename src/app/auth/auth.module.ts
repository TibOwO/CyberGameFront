// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifMailComponent } from './register/verif-mail/verif-mail.component'; 


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifMailComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
