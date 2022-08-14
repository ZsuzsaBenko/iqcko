import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard';
import { CommentsComponent } from '../shared/components/comments/comments.component';
import { AddPuzzleComponent } from './components/add-puzzle/add-puzzle.component';
import { PuzzleGameComponent } from './components/puzzle-game/puzzle-game.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';

const routes: Routes = [
    {
        path: '', children: [
            {path: 'riddles', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'math-puzzles', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'picture-puzzles', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'word-puzzles', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'ciphers', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'all', canActivate: [AuthGuard], component: PuzzlesComponent},
            {path: 'add', canActivate: [AuthGuard], component: AddPuzzleComponent, pathMatch: 'full'},
            {path: ':id', canActivate: [AuthGuard], component: PuzzleGameComponent, pathMatch: 'full'},
            {path: ':id/comments', canActivate: [AuthGuard], component: CommentsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuzzleRoutingModule {
}
