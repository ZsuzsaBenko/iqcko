import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileModule } from '../profile-module/profile.module';
import { SharedModule } from '../shared-module/shared.module';

import { AdminMembersComponent } from './admin/admin-members/admin-members.component';
import { AdminPuzzlesComponent } from './admin/admin-puzzles/admin-puzzles.component';
import { UpdatePuzzleComponent } from './admin/admin-puzzles/update-puzzle/update-puzzle.component';

@NgModule({
  declarations: [
    AdminMembersComponent,
    AdminPuzzlesComponent,
    UpdatePuzzleComponent
  ],
  imports: [
    AdminRoutingModule,
    ProfileModule,
    SharedModule
  ]
})
export class AdminModule {
}
