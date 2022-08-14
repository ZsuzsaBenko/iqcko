import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MemberCommentsComponent } from './components/member-comments/member-comments.component';
import { MemberDataComponent } from './components/member-data/member-data.component';
import { MemberPuzzlesComponent } from './components/member-puzzles/member-puzzles.component';
import { MemberSolutionsComponent } from './components/member-solutions/member-solutions.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [
        MemberCommentsComponent,
        MemberDataComponent,
        MemberPuzzlesComponent,
        MemberSolutionsComponent,
        ProfileComponent
    ],
    imports: [
        ProfileRoutingModule,
        SharedModule
    ]
})
export class ProfileModule {
}
