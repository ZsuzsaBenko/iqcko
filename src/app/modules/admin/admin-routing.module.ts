import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../../guards/admin-auth-guard';
import { ROUTES } from '../../models/constants';
import { ProfileComponent } from '../profile/components/profile/profile.component';
import { AdminMembersComponent } from './components/admin-members/admin-members.component';
import { AdminPuzzlesComponent } from './components/admin-puzzles/admin-puzzles.component';
import { UpdatePuzzleComponent } from './components/update-puzzle/update-puzzle.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AdminAuthGuard],
        children: [
            {
                path: `${ROUTES.MEMBERS}`,
                component: AdminMembersComponent
            },
            {
                path: `${ROUTES.PUZZLES}`,
                component: AdminPuzzlesComponent
            },
            {
                path: `${ROUTES.MEMBERS}/${ROUTES.UPDATE}/:id`,
                component: ProfileComponent
            },
            {
                path: `${ROUTES.PUZZLES}/${ROUTES.UPDATE}/:id`,
                component: UpdatePuzzleComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
