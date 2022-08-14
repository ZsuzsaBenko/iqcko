import { NgModule } from '@angular/core';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMembersComponent } from './components/admin-members/admin-members.component';
import { AdminPuzzlesComponent } from './components/admin-puzzles/admin-puzzles.component';
import { UpdatePuzzleComponent } from './components/update-puzzle/update-puzzle.component';

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
