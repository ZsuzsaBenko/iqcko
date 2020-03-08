import { NgModule } from '@angular/core';
import { PuzzleModuleRoutingModule } from './puzzle-module-routing.module';
import { SharedModule } from '../shared-module/shared.module';

import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { AddPuzzleComponent } from './add-puzzle/add-puzzle.component';

@NgModule({
  declarations: [
    AddPuzzleComponent,
    PuzzleGameComponent,
    PuzzlesComponent
  ],
  imports: [
    SharedModule,
    PuzzleModuleRoutingModule,
  ]
})
export class PuzzleModule {
}
