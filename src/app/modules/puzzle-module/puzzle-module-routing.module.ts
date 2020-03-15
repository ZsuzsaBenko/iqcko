import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../services/auth-guard.service';
import { AddPuzzleComponent } from './add-puzzle/add-puzzle.component';
import { CommentComponent } from '../shared-module/comment/comment.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'riddles', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'math-puzzles', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'picture-puzzles', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'word-puzzles', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'ciphers', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'all', canActivate: [AuthGuardService], component: PuzzlesComponent},
      {path: 'add', canActivate: [AuthGuardService], component: AddPuzzleComponent, pathMatch: 'full'},
      {path: ':id', canActivate: [AuthGuardService], component: PuzzleGameComponent, pathMatch: 'full'},
      {path: ':id/comments', canActivate: [AuthGuardService], component: CommentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuzzleModuleRoutingModule {
}
