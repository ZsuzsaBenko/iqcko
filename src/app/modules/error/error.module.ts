import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './components/error/error.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
    declarations: [
        ErrorComponent
    ],
    imports: [
        ErrorRoutingModule,
        SharedModule
    ]
})
export class ErrorModule {
}
