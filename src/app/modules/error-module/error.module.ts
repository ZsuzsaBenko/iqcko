import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { SharedModule } from '../shared-module/shared.module';

import { ErrorComponent } from './error/error.component';

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
