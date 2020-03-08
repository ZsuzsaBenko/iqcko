import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAuthGuardService } from '../../services/admin-auth-guard.service';
import { AdminPuzzlesComponent } from './admin/admin-puzzles/admin-puzzles.component';
import { AdminMembersComponent } from './admin/admin-members/admin-members.component';
import { UpdatePuzzleComponent } from './admin/admin-puzzles/update-puzzle/update-puzzle.component';
import { ProfileComponent } from '../profile-module/profile/profile.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'members', canActivate: [AdminAuthGuardService], component: AdminMembersComponent},
      {path: 'puzzles', canActivate: [AdminAuthGuardService], component: AdminPuzzlesComponent},
      {path: 'members/edit/:id', canActivate: [AdminAuthGuardService], component: ProfileComponent},
      {path: 'puzzles/edit/:id', canActivate: [AdminAuthGuardService], component: UpdatePuzzleComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
