import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddPuzzleComponent } from './components/add-puzzle/add-puzzle.component';
import { PuzzleGameComponent } from './components/puzzle-game/puzzle-game.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { PuzzleRoutingModule } from './puzzle-routing.module';

@NgModule({
    declarations: [
        AddPuzzleComponent,
        PuzzleGameComponent,
        PuzzlesComponent
    ],
    imports: [
        SharedModule,
        PuzzleRoutingModule
    ]
})
export class PuzzleModule {
}
