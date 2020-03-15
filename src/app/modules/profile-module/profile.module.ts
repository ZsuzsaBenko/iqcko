import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared-module/shared.module';

import { MyCommentsComponent } from './profile/my-comments/my-comments.component';
import { MyDataComponent } from './profile/my-data/my-data.component';
import { MyPuzzlesComponent } from './profile/my-puzzles/my-puzzles.component';
import { MySolutionsComponent } from './profile/my-solutions/my-solutions.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    MyCommentsComponent,
    MyDataComponent,
    MyPuzzlesComponent,
    MySolutionsComponent,
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule {
}
