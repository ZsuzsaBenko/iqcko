import { NgModule } from '@angular/core';
import { RegLoginComponent } from './welcome/reg-login/reg-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [
    RegLoginComponent,
    WelcomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class WelcomeModule {
}
