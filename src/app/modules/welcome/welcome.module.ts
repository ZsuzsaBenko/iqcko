import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegLoginComponent } from './components/reg-login/reg-login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

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
